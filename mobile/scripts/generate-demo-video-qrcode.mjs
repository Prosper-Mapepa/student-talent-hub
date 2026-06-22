#!/usr/bin/env node
import QRCode from 'qrcode';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const url = 'https://youtu.be/L_0g6aH1-hk';
const outputPath = join(__dirname, '..', 'assets', 'demo-video-qrcode.png');

QRCode.toFile(outputPath, url, { width: 400, margin: 2 }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log('Demo video QR code saved to:', outputPath);
});
