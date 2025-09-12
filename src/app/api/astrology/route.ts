import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { insertAstrologyReadingSchema } from '@/lib/schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertAstrologyReadingSchema.parse(body);
    const reading = await storage.createAstrologyReading(validatedData);
    return NextResponse.json(reading, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid astrology data" },
      { status: 400 }
    );
  }
}