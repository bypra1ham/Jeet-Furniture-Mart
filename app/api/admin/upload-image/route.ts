import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Convert Web File to ArrayBuffer then Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Get original image metadata
    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    // Ensure we have dimensions
    const width = metadata.width || 800;
    const height = metadata.height || 800;

    // Dynamically calculate font sizes based on image width to ensure it scales correctly
    // Base scale on a 1000px wide image
    const scale = Math.max(0.5, width / 1000);
    const titleSize = Math.floor(48 * scale);
    const subtitleSize = Math.floor(24 * scale);
    const patternSize = Math.floor(400 * scale);

    // Create a repeating diagonal SVG watermark pattern
    const svgWatermark = `
      <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="watermark" x="0" y="0" width="${patternSize}" height="${patternSize}" patternUnits="userSpaceOnUse" patternTransform="rotate(-45)">
            <text x="${patternSize/2}" y="${patternSize/2 - 10}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="bold" fill="rgba(255, 255, 255, 0.15)" text-anchor="middle">JEET FURNITURE</text>
            <text x="${patternSize/2}" y="${patternSize/2 + subtitleSize}" font-family="Arial, sans-serif" font-size="${subtitleSize}" fill="rgba(255, 255, 255, 0.15)" text-anchor="middle">www.jeetfurniture.com</text>
          </pattern>
        </defs>
        <rect x="0" y="0" width="100%" height="100%" fill="url(#watermark)" />
      </svg>
    `;

    // Apply the watermark
    const watermarkedBuffer = await image
      .composite([
        {
          input: Buffer.from(svgWatermark),
          blend: 'over',
        },
      ])
      .toBuffer();

    // Upload the watermarked image to Sanity
    const asset = await writeClient.assets.upload('image', watermarkedBuffer, {
      filename: file.name,
      contentType: file.type,
    });

    return NextResponse.json({ assetId: asset._id });
  } catch (error: any) {
    console.error('Image upload failed:', error);
    return NextResponse.json({ error: error?.message || 'Unknown error occurred during image processing' }, { status: 500 });
  }
}
