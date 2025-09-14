import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';
import { insertLunarDateSchema } from '@/lib/schema';
import { lunarDateAdapters, handleApiError } from '@/lib/data-adapters';

export async function GET() {
  try {
    const lunarDates = await apiClient.getLunarDates();
    
    // Transform external API response to internal format
    const transformedLunarDates = lunarDates.map(date => lunarDateAdapters.fromExternal(date));
    
    return NextResponse.json(transformedLunarDates);
  } catch (error) {
    const { error: errorMessage, status } = handleApiError(error, "Failed to fetch lunar dates");
    return NextResponse.json({ message: errorMessage }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertLunarDateSchema.parse(body);
    
    // Transform internal data to external API format
    const solarDate = validatedData.solarDate || new Date().toISOString().split('T')[0];
    const externalData = lunarDateAdapters.toExternal({ solarDate });
    const lunarDate = await apiClient.convertSolarToLunar(externalData);
    
    // Transform response back to internal format
    const transformedLunarDate = lunarDateAdapters.fromExternal(lunarDate);
    
    return NextResponse.json(transformedLunarDate, { status: 201 });
  } catch (error) {
    const { error: errorMessage, status, details } = handleApiError(error, "Invalid lunar date data");
    return NextResponse.json({ message: errorMessage, details }, { status });
  }
}