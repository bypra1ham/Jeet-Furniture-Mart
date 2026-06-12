import { NextResponse } from 'next/server';
import { writeClient } from '@/sanity/lib/client';

export async function POST(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Product ID is required' },
        { status: 400 }
      );
    }

    // Increment viewCount in Sanity
    const result = await writeClient
      .patch(id)
      .setIfMissing({ viewCount: 0 })
      .inc({ viewCount: 1 })
      .commit();

    return NextResponse.json({
      success: true,
      id: result._id,
      viewCount: result.viewCount,
    });
  } catch (error: any) {
    console.error('Error incrementing view count:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
