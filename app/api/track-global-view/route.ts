import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    // We use a fixed ID for the singleton analytics document
    const analyticsId = 'global-site-analytics';

    // Increment globalViews in Sanity
    // createIfNotExists will ensure the document is created on the very first run
    const result = await writeClient
      .transaction()
      .createIfNotExists({ _id: analyticsId, _type: 'siteAnalytics', globalViews: 0 })
      .patch(analyticsId, (p) => p.inc({ globalViews: 1 }))
      .commit();

    return NextResponse.json({
      success: true,
      message: 'Global view tracked',
    });
  } catch (error: any) {
    console.error('Error tracking global view:', error);
    return NextResponse.json({ error: 'Failed to track global view' }, { status: 500 });
  }
}
