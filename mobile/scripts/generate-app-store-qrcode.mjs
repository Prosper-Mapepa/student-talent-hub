#!/usr/bin/env node
import QRCode from 'qrcode';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = 'https://apps.apple.com/us/app/cmu-talenthub/id6757563079';
const outputPath = join(__dirname, '..', 'assets', 'app-store-qrcode.png');

QRCode.toFile(outputPath, url, { width: 400, margin: 2 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('QR code saved to:', outputPath);
});
