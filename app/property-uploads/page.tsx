import type { Metadata } from 'next';
import { FileSpreadsheet, Download, Upload, CheckCircle } from 'lucide-react';
import { PropertyUploadForm } from '@/components/forms/property-upload-form';

export const metadata: Metadata = {
  title: 'Property Uploads — Ohio Valley Builders Network',
  description:
    'Upload your property inventory spreadsheet. List the parcels you want to sell through the Ohio Valley Land Partners buyer network.',
};

const requiredColumns = [
  { name: 'Parcel ID', description: 'County auditor parcel number' },
  { name: 'Property Address', description: 'Street address of the property' },
  { name: 'City', description: 'City or township' },
  { name: 'State', description: 'Two-letter state code' },
  { name: 'County', description: 'County name' },
  { name: 'Acreage', description: 'Total acreage' },
  { name: 'Zoning', description: 'Current zoning designation (R-1, Agricultural, etc.)' },
  { name: 'Acquisition Date', description: 'Date you acquired the property (YYYY-MM-DD)' },
  { name: 'Asking Price', description: 'Your asking price in dollars' },
];

const optionalColumns = [
  { name: 'Zip', description: 'ZIP code' },
  { name: 'Purchase Price', description: 'What you paid for it' },
  { name: 'Property Type', description: 'Vacant Land, Improved, etc.' },
  { name: 'Utilities Available', description: 'Water, Electric, Sewer, Gas, None' },
  { name: 'Road Access', description: 'Paved, Gravel, Dirt, None' },
  { name: 'Notes', description: 'Anything else we should know' },
];

export default function PropertyUploads() {
  return (
    <div className="min-h-screen bg-background">
      <section className="py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          {/* Header */}
          <div className="mx-auto max-w-2xl text-center mb-16">
            <p className="heading-serif text-amber text-2xl mb-3">Builders Network</p>
            <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Property
              <span className="block text-amber mt-1">Uploads</span>
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              Upload your property inventory and we&apos;ll get your parcels in front of
              our buyer network. Download the template below, fill in your properties,
              and upload.
            </p>
          </div>

          {/* How It Works */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3 mb-16">
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber mb-4 mx-auto">
                <Download className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">1. Download Template</h3>
              <p className="text-sm text-muted-foreground">
                Grab the CSV template with the exact columns we need.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber mb-4 mx-auto">
                <FileSpreadsheet className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">2. Fill In Your Properties</h3>
              <p className="text-sm text-muted-foreground">
                One row per parcel. Include parcel ID, address, zoning, and your asking price.
              </p>
            </div>
            <div className="rounded-xl border border-border bg-card p-6 text-center">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber/10 text-amber mb-4 mx-auto">
                <Upload className="h-5 w-5" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">3. Upload &amp; We Review</h3>
              <p className="text-sm text-muted-foreground">
                Our team reviews the file and follows up about parcels that match active buyers.
              </p>
            </div>
          </div>

          {/* Template Download + Column Reference */}
          <div className="mx-auto max-w-3xl mb-16">
            <div className="rounded-2xl border border-border bg-card p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-foreground">Spreadsheet Template</h2>
                <a
                  href="/templates/property-upload-template.csv"
                  download="OVLP_Property_Upload_Template.csv"
                  className="inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  <Download className="h-4 w-4" />
                  Download CSV
                </a>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  Required Columns
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 font-medium text-foreground">Column</th>
                        <th className="text-left py-2 font-medium text-foreground">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {requiredColumns.map((col) => (
                        <tr key={col.name} className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs text-primary">{col.name}</td>
                          <td className="py-2 text-muted-foreground">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3 text-muted-foreground">
                  Optional Columns
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      {optionalColumns.map((col) => (
                        <tr key={col.name} className="border-b border-border/50">
                          <td className="py-2 pr-4 font-mono text-xs text-muted-foreground">{col.name}</td>
                          <td className="py-2 text-muted-foreground">{col.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Upload Form */}
          <div className="mx-auto max-w-2xl">
            <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground">Upload Your Properties</h2>
                <p className="text-sm text-muted-foreground mt-2">
                  Fill out the template and drop it here. We&apos;ll review and get back to you.
                </p>
              </div>
              <PropertyUploadForm />
            </div>
          </div>

          <p className="mt-10 text-center text-xs text-muted-foreground max-w-xl mx-auto">
            Uploads are reviewed by our team manually. Submitting a property does not
            guarantee listing or sale. We&apos;ll reach out directly to discuss any
            parcels that match active buyer demand.
          </p>
        </div>
      </section>
    </div>
  );
}
