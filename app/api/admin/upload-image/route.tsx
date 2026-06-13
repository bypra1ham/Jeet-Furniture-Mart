import { NextRequest, NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';
import sharp from 'sharp';
import { ImageResponse } from 'next/og';
import React from 'react';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const image = sharp(buffer);
    const metadata = await image.metadata();
    
    const width = metadata.width || 800;
    const height = metadata.height || 800;

    const scale = Math.max(0.5, width / 1000);
    const titleSize = Math.floor(48 * scale);
    const subtitleSize = Math.floor(24 * scale);

    // Generate watermark overlay using Next.js built-in OG Image generator (Satori)
    // This perfectly converts React/CSS to a PNG buffer and has built-in fonts,
    // completely avoiding Vercel's missing system fonts issue.
    const watermarkRes = new ImageResponse(
      (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            backgroundColor: 'transparent',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '200%',
              height: '200%',
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              transform: 'rotate(-35deg)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  margin: `${50 * scale}px ${100 * scale}px`,
                }}
              >
                <span
                  style={{
                    fontSize: titleSize,
                    fontWeight: 900,
                    color: 'rgba(255, 255, 255, 0.45)',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  JEET FURNITURE
                </span>
                <span
                  style={{
                    fontSize: subtitleSize,
                    color: 'rgba(255, 255, 255, 0.45)',
                    textShadow: '1px 1px 2px rgba(0, 0, 0, 0.5)',
                    marginTop: 5,
                  }}
                >
                  www.jeetfurniture.com
                </span>
              </div>
            ))}
          </div>
        </div>
      ),
      {
        width,
        height,
      }
    );

    const watermarkBuffer = Buffer.from(await watermarkRes.arrayBuffer());

    // Composite the dynamically generated PNG watermark over the original image
    const watermarkedBuffer = await image
      .composite([
        {
          input: watermarkBuffer,
          blend: 'over',
        },
      ])
      .toBuffer();

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
