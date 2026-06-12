import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { productId, productName, category } = await request.json();

    console.warn(
      'WhatsApp Click logged to server logs (Supabase removed):',
      { productId, productName, category, timestamp: new Date().toISOString() }
    );
    
    return NextResponse.json({
      success: true,
      message: 'Click recorded in server console',
    });
  } catch (error: any) {
    console.error('Error logging WhatsApp click:', error);
    return NextResponse.json(
      { error: 'Internal Server Error', details: error.message },
      { status: 500 }
    );
  }
}
