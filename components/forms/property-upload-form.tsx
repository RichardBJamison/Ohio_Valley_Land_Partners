'use client';

import { useCallback, useState, useRef } from 'react';
import { TurnstileWidget } from '@/components/TurnstileWidget';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckCircle, Upload, FileSpreadsheet, Download, Loader2, X } from 'lucide-react';
import { trackConversionEvent } from '@/components/analytics/conversion-tracker';

export function PropertyUploadForm() {
  const [file, setFile] = useState<File | null>(null);
  const [uploaderName, setUploaderName] = useState('');
  const [uploaderEmail, setUploaderEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState('');
  const onTurnstileExpire = useCallback(() => setTurnstileToken(''), []);
  const inputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED = '.csv,.xlsx,.xls';

  function handleFile(f: File | undefined) {
    if (!f) return;
    const ext = f.name.split('.').pop()?.toLowerCase();
    if (!['csv', 'xlsx', 'xls'].includes(ext || '')) {
      setError('Please upload a .csv, .xlsx, or .xls file.');
      trackConversionEvent('form_error', {
        form_name: 'property_upload_form',
        error_type: 'validation',
      });
      return;
    }
    if (f.size > 10 * 1024 * 1024) {
      setError('File must be under 10 MB.');
      trackConversionEvent('form_error', {
        form_name: 'property_upload_form',
        error_type: 'validation',
      });
      return;
    }
    setError('');
    setFile(f);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    handleFile(e.dataTransfer.files[0]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!uploaderName.trim() || !uploaderEmail.trim()) {
      setError('Name and email are required.');
      trackConversionEvent('form_error', {
        form_name: 'property_upload_form',
        error_type: 'validation',
      });
      return;
    }
    if (!file) {
      setError('Please select a file to upload.');
      trackConversionEvent('form_error', {
        form_name: 'property_upload_form',
        error_type: 'validation',
      });
      return;
    }

    setLoading(true);
    try {
      const base64 = await toBase64(file);
      const res = await fetch('/api/property-upload', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: uploaderName.trim(),
          email: uploaderEmail.trim(),
          fileName: file.name,
          fileData: base64,
          turnstileToken,
        }),
      });
      if (!res.ok) throw new Error('Upload failed');
      setSubmitted(true);
      trackConversionEvent('successful_submission', { form_name: 'property_upload_form' });
    } catch {
      setError('Something went wrong. Email your file directly to info@ohiovalleylandpartners.com');
      trackConversionEvent('form_error', {
        form_name: 'property_upload_form',
        error_type: 'request',
      });
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 py-10 text-center">
        <CheckCircle className="h-12 w-12 text-green-500" />
        <h3 className="text-xl font-bold text-foreground">Upload Received</h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          We&apos;ve received your property list. Our team will review it and follow up about parcels that match active buyer demand.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6"
      data-analytics-form="property_upload_form"
    >
      {/* Uploader info */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="up-name">Your Name</Label>
          <Input
            id="up-name"
            placeholder="John Holmes"
            value={uploaderName}
            onChange={(e) => setUploaderName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="up-email">Email</Label>
          <Input
            id="up-email"
            type="email"
            placeholder="john@example.com"
            value={uploaderEmail}
            onChange={(e) => setUploaderEmail(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Drop zone */}
      <div
        className={`relative flex flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed p-8 transition-colors cursor-pointer ${
          dragOver
            ? 'border-primary bg-primary/5'
            : file
            ? 'border-green-500/50 bg-green-500/5'
            : 'border-border hover:border-primary/50'
        }`}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED}
          className="hidden"
          onChange={(e) => handleFile(e.target.files?.[0])}
        />
        {file ? (
          <>
            <FileSpreadsheet className="h-10 w-10 text-green-500" />
            <div className="text-center">
              <p className="font-medium text-foreground">{file.name}</p>
              <p className="text-xs text-muted-foreground">
                {(file.size / 1024).toFixed(0)} KB
              </p>
            </div>
            <button
              type="button"
              className="absolute top-3 right-3 rounded-full p-1 hover:bg-muted"
              onClick={(e) => { e.stopPropagation(); setFile(null); }}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </button>
          </>
        ) : (
          <>
            <Upload className="h-10 w-10 text-muted-foreground" />
            <div className="text-center">
              <p className="font-medium text-foreground">
                Drop your spreadsheet here or click to browse
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                .csv, .xlsx, or .xls &mdash; 10 MB max
              </p>
            </div>
          </>
        )}
      </div>

      <TurnstileWidget onToken={setTurnstileToken} onExpire={onTurnstileExpire} />

      {error && <p className="text-sm text-red-500" role="alert">{error}</p>}

      <Button type="submit" size="lg" className="w-full h-12 font-bold" disabled={loading}>
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Uploading...</>
        ) : (
          'Upload Properties'
        )}
      </Button>
    </form>
  );
}

function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      resolve(result.split(',')[1]); // strip data:...;base64, prefix
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}
