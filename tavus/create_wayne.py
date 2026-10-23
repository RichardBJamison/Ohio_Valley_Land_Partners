#!/usr/bin/env python3
"""Create or update the OVLP Wayne Tavus PAL, knowledge crawl, tool, and embed deployment.

Reads TAVUS_API_KEY from ~/Me-Nexus/.env or credentials/tavus.json.
Writes IDs to tavus/wayne-ovlp.json (no secrets).
Writes HMAC secret to ~/Me-Nexus/credentials/ovlp-wayne-tavus.json (chmod 600).
"""
from __future__ import annotations

import json
import os
import secrets
import ssl
import time
import urllib.error
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
NEXUS = Path.home() / "Me-Nexus"
OUT = ROOT / "tavus" / "wayne-ovlp.json"
CREDS = NEXUS / "credentials" / "ovlp-wayne-tavus.json"
PROMPT = (ROOT / "tavus" / "wayne-ovlp-prompt.txt").read_text()
GREETING = (
    "Hi, I'm Wayne with Ohio Valley Land Partners. We buy land across the Ohio Valley — "
    "inherited, vacant, tax-burdened, the parcels that are hard to manage. "
    "Want to tell me about a property, or should I start with how a review works?"
)
PAL_NAME = "Wayne — Ohio Valley Land Partners"
FACE_ID = "r72f7f7f7c8b"
TOOL_NAME = "submit_property_review"
TOOL_URL = "https://ohiovalleylandpartners.com/api/wayne-lead"
ORIGINS = [
    "https://ohiovalleylandpartners.com",
    "https://www.ohiovalleylandpartners.com",
    "http://ohiovalleylandpartners.com",
    "http://www.ohiovalleylandpartners.com",
    "https://ohio-valley-land-partners.pages.dev",
    "http://127.0.0.1:8893",
    "http://localhost:8893",
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://127.0.0.1:8788",
    "http://localhost:8788",
]


def load_key() -> str:
    env_path = NEXUS / ".env"
    if env_path.exists():
        for line in env_path.read_text().splitlines():
            line = line.strip()
            if line.startswith("TAVUS_API_KEY="):
                return line.split("=", 1)[1].strip().strip('"').strip("'")
    pack = json.loads((NEXUS / "credentials" / "tavus.json").read_text())
    return pack["api_key"]


def api(method: str, path: str, body=None, key: str = ""):
    data = None if body is None else json.dumps(body).encode()
    req = urllib.request.Request(
        "https://tavusapi.com/v2" + path,
        data=data,
        method=method,
        headers={"x-api-key": key, "Content-Type": "application/json"},
    )
    try:
        with urllib.request.urlopen(req, timeout=60, context=ssl.create_default_context()) as res:
            raw = res.read().decode()
            return res.status, json.loads(raw) if raw else {}
    except urllib.error.HTTPError as e:
        raw = e.read().decode()
        try:
            parsed = json.loads(raw)
        except json.JSONDecodeError:
            parsed = {"error": raw[:500]}
        return e.code, parsed


def find_pal(key: str):
    status, payload = api("GET", "/pals?limit=50", key=key)
    if status != 200:
        raise SystemExit(f"GET /pals failed {status} {payload}")
    for pal in payload.get("data") or []:
        if pal.get("pal_name") == PAL_NAME:
            return pal
    return None


def find_tool(key: str):
    status, payload = api("GET", "/tools", key=key)
    if status != 200:
        raise SystemExit(f"GET /tools failed {status} {payload}")
    for tool in payload.get("data") or []:
        if tool.get("name") == TOOL_NAME:
            return tool
    return None


def find_deployment(key: str, pal_id: str):
    status, payload = api("GET", "/deployments", key=key)
    if status != 200:
        return None
    for dep in payload.get("data") or []:
        if dep.get("pal_id") == pal_id and dep.get("name") == "Wayne — OVLP Embed":
            return dep
    return None


def load_or_make_secret() -> str:
    if CREDS.exists():
        return json.loads(CREDS.read_text())["tool_hmac_secret"]
    secret = secrets.token_hex(32)
    CREDS.write_text(
        json.dumps(
            {
                "service": "OVLP Wayne Tavus tool HMAC",
                "tool_name": TOOL_NAME,
                "tool_url": TOOL_URL,
                "tool_hmac_secret": secret,
                "NOTE": "Cloudflare Pages secret TAVUS_TOOL_SECRET. Never commit.",
            },
            indent=2,
        )
        + "\n"
    )
    os.chmod(CREDS, 0o600)
    return secret


def main():
    key = load_key()
    hmac_secret = load_or_make_secret()
    ids = {}

    status, doc = api(
        "POST",
        "/documents",
        {
            "document_name": "OVLP website crawl",
            "document_url": "https://ohiovalleylandpartners.com",
            "tags": ["ovlp-wayne"],
            "crawl": {"depth": 2, "max_pages": 40},
        },
        key=key,
    )
    print("document", status, doc.get("document_id") or doc)
    if status == 200:
        ids["document_id"] = doc["document_id"]

    status, about = api(
        "POST",
        "/documents",
        {
            "document_name": "OVLP about + land",
            "document_url": "https://ohiovalleylandpartners.com/about",
            "tags": ["ovlp-wayne"],
        },
        key=key,
    )
    print("about doc", status, about.get("document_id") or about)
    if status == 200:
        ids["about_document_id"] = about["document_id"]

    status, objectives = api(
        "POST",
        "/objectives",
        {
            "data": [
                {
                    "objective_name": "greet_and_invite",
                    "objective_prompt": "Greet them as Wayne from Ohio Valley Land Partners. In two sentences say OVLP buys land in the Ohio Valley as a direct principal, not a listing agent. Ask if they have a property to review or a question about how a review works.",
                    "confirmation_mode": "auto",
                    "modality": "verbal",
                    "output_variables": ["visitor_intent"],
                    "next_required_objective": "collect_review",
                },
                {
                    "objective_name": "collect_review",
                    "objective_prompt": "If they have or might have land, collect full name, phone number, email, and property address. Ask for the phone number. Confirm you may have a local buyer contact them. Then call submit_property_review. If they only want information, answer from OVLP facts and still invite the form or a call to (614) 653-7430.",
                    "confirmation_mode": "auto",
                    "modality": "verbal",
                    "output_variables": ["full_name", "phone", "email", "property_address"],
                },
            ]
        },
        key=key,
    )
    print("objectives", status, objectives.get("objectives_id") or objectives)
    if status == 200:
        ids["objectives_id"] = objectives["objectives_id"]

    pal = find_pal(key)
    pal_body = {
        "pal_name": PAL_NAME,
        "pipeline_mode": "full",
        "system_prompt": PROMPT,
        "greeting": GREETING,
        "default_face_id": FACE_ID,
        "document_tags": ["ovlp-wayne"],
        "layers": {
            "perception": {"perception_model": "off", "emotion_recognition": "auto"},
            "tts": {"tts_engine": "tavus-auto", "tts_emotion_control": True},
            "llm": {"model": "tavus-gemma-4", "speculative_inference": True},
            "stt": {
                "stt_engine": "tavus-auto",
                "hotwords": (
                    "Ohio Valley Land Partners, OVLP, Wayne, Franklin County, Belmont, "
                    "Jefferson, Columbiana, Harrison, Carroll, Brooke, Marshall, "
                    "Wheeling, Columbus, Newark, Geauga, inherited land, back taxes"
                ),
            },
            "conversational_flow": {
                "turn_detection_model": "sparrow-2",
                "turn_taking_patience": "medium",
                "pal_interruptibility": "medium",
                "voice_isolation": "near",
                "greeting_mode": "on_join",
                "idle_engagement": "off",
                "idle_end_behavior": "wait",
            },
        },
    }
    if ids.get("objectives_id"):
        pal_body["objectives_id"] = ids["objectives_id"]
    if ids.get("document_id"):
        pal_body["document_ids"] = [d for d in [ids.get("document_id"), ids.get("about_document_id")] if d]

    if pal:
        pal_id = pal["pal_id"]
        print("existing pal", pal_id)
        patch = [
            {"op": "replace", "path": "/system_prompt", "value": PROMPT},
            {"op": "replace", "path": "/greeting", "value": GREETING},
        ]
        if ids.get("objectives_id"):
            patch.append({"op": "replace", "path": "/objectives_id", "value": ids["objectives_id"]})
        req = urllib.request.Request(
            f"https://tavusapi.com/v2/pals/{pal_id}",
            data=json.dumps(patch).encode(),
            method="PATCH",
            headers={
                "x-api-key": key,
                "Content-Type": "application/json-patch+json",
            },
        )
        try:
            with urllib.request.urlopen(req, timeout=60) as res:
                print("pal patch", res.status)
        except urllib.error.HTTPError as e:
            print("pal patch", e.code, e.read().decode()[:400])
    else:
        status, created = api("POST", "/pals", pal_body, key=key)
        print("pal create", status, created.get("pal_id") or created)
        if status != 200:
            raise SystemExit("PAL create failed")
        pal_id = created["pal_id"]
    ids["pal_id"] = pal_id

    tool = find_tool(key)
    tool_body = {
        "name": TOOL_NAME,
        "description": (
            "Submit a property-review lead to Ohio Valley Land Partners. "
            "Call this when the visitor has given a property address and a phone number or email "
            "and agrees that OVLP may contact them."
        ),
        "parameters": {
            "type": "object",
            "properties": {
                "full_name": {"type": "string", "description": "Visitor's name"},
                "phone": {"type": "string", "description": "Phone number, digits they spoke"},
                "email": {"type": "string", "description": "Email address if they gave one"},
                "property_address": {"type": "string", "description": "Land or property address"},
                "notes": {
                    "type": "string",
                    "description": "Anything else: inherited, taxes, access, acreage, county",
                },
                "consent": {
                    "type": "boolean",
                    "description": "True if they agreed OVLP may contact them about this property",
                },
            },
            "required": ["property_address"],
        },
        "origin": "llm",
        "on_call": "static_filler",
        "static_filler": "One moment — I'll send that to our local buyers.",
        "on_resolve": "generate_response",
        "delivery": {
            "api": {
                "url": TOOL_URL,
                "method": "POST",
                "auth": {"type": "hmac", "secret": hmac_secret},
                "timeout": 20,
            }
        },
    }
    if tool:
        tool_id = tool["tool_id"]
        print("existing tool", tool_id)
        status, updated = api("PATCH", f"/tools/{tool_id}", tool_body, key=key)
        print("tool patch", status, updated.get("tool_id") or updated)
    else:
        status, created_tool = api("POST", "/tools", tool_body, key=key)
        print("tool create", status, created_tool.get("tool_id") or created_tool)
        if status not in (200, 201):
            raise SystemExit("tool create failed")
        tool_id = created_tool["tool_id"]
    ids["tool_id"] = tool_id

    status, attached = api("POST", f"/pals/{pal_id}/tools", {"tool_ids": [tool_id]}, key=key)
    print("attach tool", status, "ok" if status == 200 else attached)

    customization = {
        "schema_version": 1,
        "terms_enabled": False,
        "show_haircheck": False,
        "require_captcha": False,
        "conversation": {
            "modality": "video",
            "enable_chat": True,
            "enable_closed_captions": True,
            "enable_picture_in_picture": False,
            "unique_memory_tag": True,
        },
        "widget": {
            "variant": "compact",
            "position": "bottom-right",
            "expandable": "start-expanded",
            "avatar": {"type": "orb"},
            "text": {"title": "Wayne", "btn_title": "Talk to Wayne"},
        },
    }
    dep = find_deployment(key, pal_id)
    dep_body = {
        "pal_id": pal_id,
        "channel": "embed",
        "name": "Wayne — OVLP Embed",
        "allowed_origins": ORIGINS,
        "customization": customization,
        "limits": {"max_call_duration": 300},
    }
    if dep:
        dep_id = dep["deployment_id"]
        print("existing deployment", dep_id)
        status, patched = api("PATCH", f"/deployments/{dep_id}", dep_body, key=key)
        print("deploy patch", status, patched.get("deployment_id") or patched)
    else:
        status, created_dep = api("POST", "/deployments", dep_body, key=key)
        print("deploy create", status, created_dep.get("deployment_id") or created_dep)
        if status not in (200, 201):
            raise SystemExit("deployment create failed")
        dep_id = created_dep["deployment_id"]
    patch = [{"op": "replace", "path": "/status", "value": "active"}]
    req = urllib.request.Request(
        f"https://tavusapi.com/v2/deployments/{dep_id}",
        data=json.dumps(patch).encode(),
        method="PATCH",
        headers={
            "x-api-key": key,
            "Content-Type": "application/json-patch+json",
        },
    )
    try:
        with urllib.request.urlopen(req, timeout=60) as res:
            raw = res.read().decode()
            parsed = json.loads(raw) if raw else {}
            print("deploy activate", res.status, parsed.get("status"))
    except urllib.error.HTTPError as e:
        print("deploy activate", e.code, e.read().decode()[:400])
    ids["deployment_id"] = dep_id

    record = {
        "pal_id": pal_id,
        "pal_name": PAL_NAME,
        "face_id": FACE_ID,
        "deployment_id": dep_id,
        "tool_id": tool_id,
        "tool_name": TOOL_NAME,
        "objectives_id": ids.get("objectives_id"),
        "document_id": ids.get("document_id"),
        "about_document_id": ids.get("about_document_id"),
        "embed_script": "https://unpkg.com/@tavus/embed@0.18.0",
        "created": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime()),
    }
    OUT.write_text(json.dumps(record, indent=2) + "\n")
    ts_path = ROOT / "lib" / "wayne.ts"
    ts_path.write_text(
        "export const WAYNE_PAL_ID = "
        + json.dumps(pal_id)
        + ";\nexport const WAYNE_DEPLOYMENT_ID = "
        + json.dumps(dep_id)
        + ";\nexport const WAYNE_EMBED_SCRIPT = 'https://unpkg.com/@tavus/embed@0.18.0';\n"
    )
    print("wrote", OUT)
    print("wrote", ts_path)
    print("secret_file", str(CREDS), "exists", CREDS.exists())


if __name__ == "__main__":
    main()
