export const SITE = {
  name: 'PDF Fluid',
  domain: 'pdffluid.com',
  tagline: 'Plain-English answers to every PDF problem',
  description:
    'Learn how PDF files work and fix common PDF problems: compress large PDFs, unlock, convert, merge, fix fonts and more. Free, clear, step-by-step guides.',
  // Google Analytics 4 Measurement ID, e.g. 'G-XXXXXXXXXX'. Leave empty to disable tracking.
  gaId: 'G-9PCRLE6VN7',
};

export const CATEGORIES: Record<string, { label: string; color: string; icon: string }> = {
  size: { label: 'Size & Compression', color: '#E8453C', icon: 'compress' },
  edit: { label: 'Editing & Text', color: '#2F80ED', icon: 'edit' },
  convert: { label: 'Converting', color: '#27AE60', icon: 'convert' },
  organize: { label: 'Merge, Split & Organize', color: '#F2994A', icon: 'layers' },
  security: { label: 'Passwords & Security', color: '#9B51E0', icon: 'lock' },
  trouble: { label: 'Opening & Printing', color: '#EB5757', icon: 'alert' },
  scan: { label: 'Scans & OCR', color: '#00A3A3', icon: 'scan' },
  sign: { label: 'Forms & Signatures', color: '#4F5BD5', icon: 'sign' },
};
