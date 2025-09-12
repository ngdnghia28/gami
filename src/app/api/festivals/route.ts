import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { insertFestivalSchema } from '@/lib/schema';

export async function GET() {
  try {
    const festivals = await storage.getAllFestivals();
    return NextResponse.json(festivals);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch festivals" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertFestivalSchema.parse(body);
    const festival = await storage.createFestival(validatedData);
    return NextResponse.json(festival, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid festival data" },
      { status: 400 }
    );
  }
}