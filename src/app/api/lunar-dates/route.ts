import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';
import { insertLunarDateSchema } from '@/lib/schema';

export async function GET() {
  try {
    const lunarDates = await storage.getAllLunarDates();
    return NextResponse.json(lunarDates);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch lunar dates" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertLunarDateSchema.parse(body);
    const lunarDate = await storage.createLunarDate(validatedData);
    return NextResponse.json(lunarDate, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "Invalid lunar date data" },
      { status: 400 }
    );
  }
}