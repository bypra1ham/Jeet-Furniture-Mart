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

    // Calculate a grid of text to cover the image reliably without using <pattern>
    // which has spotty support in some librsvg builds.
    const diag = Math.sqrt(width * width + height * height);
    const cols = Math.ceil(diag / patternSize) + 1;
    const rows = Math.ceil(diag / patternSize) + 1;
    
    let textNodes = '';
    // Generate a grid of text nodes that covers an area larger than the image
    // so when rotated, it covers all corners.
    const startX = -diag / 2;
    const startY = -diag / 2;
    
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        const cx = startX + (i * patternSize);
        const cy = startY + (j * patternSize);
        
        // Dark drop shadow for visibility on light backgrounds
        textNodes += `<text x="${cx}" y="${cy}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="bold" fill="#000000" fill-opacity="0.3" text-anchor="middle">JEET FURNITURE</text>`;
        textNodes += `<text x="${cx}" y="${cy + subtitleSize}" font-family="Arial, sans-serif" font-size="${subtitleSize}" fill="#000000" fill-opacity="0.3" text-anchor="middle">www.jeetfurniture.com</text>`;
        
        // White main text
        textNodes += `<text x="${cx - 2}" y="${cy - 2}" font-family="Arial, sans-serif" font-size="${titleSize}" font-weight="bold" fill="#ffffff" fill-opacity="0.35" text-anchor="middle">JEET FURNITURE</text>`;
        textNodes += `<text x="${cx - 2}" y="${cy - 2 + subtitleSize}" font-family="Arial, sans-serif" font-size="${subtitleSize}" fill="#ffffff" fill-opacity="0.35" text-anchor="middle">www.jeetfurniture.com</text>`;
      }
    }

    // Create the SVG with a centered rotation group
    const svgWatermark = \`
      <svg width="\${width}" height="\${height}" xmlns="http://www.w3.org/2000/svg">
        <g transform="translate(\${width / 2}, \${height / 2}) rotate(-35)">
          \${textNodes}
        </g>
      </svg>
    \`;

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
