import { NextRequest, NextResponse } from 'next/server';
import { apiClient, type ApiError } from '@/lib/api-client';
import { insertFestivalSchema } from '@/lib/schema';
import { festivalAdapters, handleApiError } from '@/lib/data-adapters';

export async function GET() {
  try {
    const festivals = await apiClient.getFestivals();
    
    // Transform external API response to internal format
    const transformedFestivals = festivals.map(festival => festivalAdapters.fromExternal(festival));
    
    return NextResponse.json(transformedFestivals);
  } catch (error) {
    const { error: errorMessage, status } = handleApiError(error, "Failed to fetch festivals");
    return NextResponse.json({ message: errorMessage }, { status });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const validatedData = insertFestivalSchema.parse(body);
    
    // Transform internal data to external API format
    const externalData = festivalAdapters.toExternal(validatedData);
    const festival = await apiClient.createFestival(externalData);
    
    // Transform response back to internal format
    const transformedFestival = festivalAdapters.fromExternal(festival);
    
    return NextResponse.json(transformedFestival, { status: 201 });
  } catch (error) {
    const { error: errorMessage, status, details } = handleApiError(error, "Invalid festival data");
    return NextResponse.json({ message: errorMessage, details }, { status });
  }
}