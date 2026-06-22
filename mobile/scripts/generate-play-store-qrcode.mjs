#!/usr/bin/env node
import QRCode from 'qrcode';
import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = 'https://play.google.com/store/apps/details?id=com.prospermap.StudentTalentHubMobile';
const outputPath = join(__dirname, '..', 'assets', 'play-store-qrcode.png');

QRCode.toFile(outputPath, url, { width: 400, margin: 2 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Play Store QR code saved to:', outputPath);
});
