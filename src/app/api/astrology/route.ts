import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';
import { insertAstrologyReadingSchema } from '@/lib/schema';
import { astrologyAdapters, handleApiError } from '@/lib/data-adapters';

export async function GET() {
  try {
    const readings = await apiClient.getAstrologyReadings();
    
    // Transform external API response to internal format
    const transformedReadings = readings.map(reading => astrologyAdapters.fromExternal(reading));
    
    return NextResponse.json(transformedReadings);
  } catch (error) {
    const { error: errorMessage, status } = handleApiError(error, "Failed to fetch astrology readings");
    return NextResponse.json({ message: errorMessage }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertAstrologyReadingSchema.parse(body);
    
    // Transform internal data to external API format
    const externalData = astrologyAdapters.toExternal(validatedData);
    const reading = await apiClient.createAstrologyReading(externalData);
    
    // Transform response back to internal format
    const transformedReading = astrologyAdapters.fromExternal(reading);
    
    return NextResponse.json(transformedReading, { status: 201 });
  } catch (error) {
    const { error: errorMessage, status, details } = handleApiError(error, "Invalid astrology data");
    return NextResponse.json({ message: errorMessage, details }, { status });
  }
}