#!/usr/bin/env bash
# Notify IndexNow only about URLs changed by a release.
# Key file: https://ohiovalleylandpartners.com/97803ac8eb1a4fb997336648f3d7eb26.txt
# Usage: ./scripts/indexnow-notify.sh URL [URL ...]
#        ./scripts/indexnow-notify.sh --sitemap  # intentional full resubmission

set -euo pipefail

SITE="https://ohiovalleylandpartners.com"
KEY="97803ac8eb1a4fb997336648f3d7eb26"
KEY_LOCATION="${SITE}/${KEY}.txt"
SITEMAP="${SITE}/sitemap.xml"

if [ "$#" -eq 0 ]; then
  echo "Usage: $0 URL [URL ...]" >&2
  echo "       $0 --sitemap" >&2
  exit 64
fi

if [ "$1" = "--sitemap" ]; then
  echo "Fetching URLs from ${SITEMAP}..."
  URLS=$(curl -sS "${SITEMAP}" | sed -n 's:.*<loc>\([^<]*\)</loc>.*:\1:p')
else
  for url in "$@"; do
    case "$url" in
      "${SITE}"|"${SITE}"/*) ;;
      *)
        echo "ERROR: Refusing non-canonical URL: ${url}" >&2
        exit 64
        ;;
    esac
  done
  URLS=$(printf '%s\n' "$@" | awk '!seen[$0]++')
fi

if [ -z "${URLS}" ]; then
  echo "ERROR: No URLs found in sitemap" >&2
  exit 1
fi

COUNT=$(echo "${URLS}" | wc -l | tr -d ' ')
echo "Submitting ${COUNT} changed URLs to IndexNow..."

# IndexNow accepts max 10,000 URLs per request; batch in chunks of 100
BATCH=()
BATCH_NUM=0

submit_batch() {
  local n=${#BATCH[@]}
  [ "$n" -eq 0 ] && return 0
  BATCH_NUM=$((BATCH_NUM + 1))
  local url_list
  url_list=$(printf ',"%s"' "${BATCH[@]}")
  url_list="[${url_list:1}]"
  local json
  json=$(cat <<EOF
{
  "host": "ohiovalleylandpartners.com",
  "key": "${KEY}",
  "keyLocation": "${KEY_LOCATION}",
  "urlList": ${url_list}
}
EOF
)
  echo "  Batch ${BATCH_NUM}: ${n} URLs"
  curl -sS -X POST "https://api.indexnow.org/indexnow" \
    -H "Content-Type: application/json; charset=utf-8" \
    -d "${json}"
  echo ""
  BATCH=()
}

while IFS= read -r url; do
  BATCH+=("$url")
  if [ "${#BATCH[@]}" -ge 100 ]; then
    submit_batch
  fi
done <<< "${URLS}"

submit_batch

echo "IndexNow submission complete (${COUNT} URLs total)"
