import { NextRequest, NextResponse } from 'next/server';
import { storage } from '@/lib/storage';

export async function GET(
  request: NextRequest,
  { params }: { params: { date: string } }
) {
  try {
    const lunarDate = await storage.getLunarDateBySolar(params.date);
    if (!lunarDate) {
      return NextResponse.json(
        { message: "Lunar date not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(lunarDate);
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch lunar date" },
      { status: 500 }
    );
  }
}