import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const reading = await storage.getAstrologyReading(params.id);
    if (!reading) {
      return NextResponse.json(
        { message: "Astrology reading not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(reading);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch astrology reading" },
      { status: 500 }
    );
  }
}