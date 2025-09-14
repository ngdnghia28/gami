import type { ApiError } from './api-client';
import type { BlogPost, Festival, LunarDate, AstrologyReading } from './api-client';
import type { 
  BlogPost as InternalBlogPost, 
  Festival as InternalFestival, 
  LunarDate as InternalLunarDate, 
  AstrologyReading as InternalAstrologyReading 
} from './schema';

/**
 * Data transformation adapters to map between external API responses and internal schema
 */

// Helper function to safely parse dates
function safeDateParse(dateInput: string | Date | null | undefined): Date | null {
  if (!dateInput) return null;
  
  if (dateInput instanceof Date) return dateInput;
  
  try {
    const parsed = new Date(dateInput);
    return isNaN(parsed.getTime()) ? null : parsed;
  } catch {
    return null;
  }
}

// Helper function to ensure string format for dates
function ensureDateString(dateInput: string | Date | null | undefined): string | null {
  if (!dateInput) return null;
  
  if (typeof dateInput === 'string') return dateInput;
  
  try {
    return dateInput.toISOString().split('T')[0];
  } catch {
    return null;
  }
}

/**
 * Blog Post Adapters
 */
export const blogPostAdapters = {
  // Transform external API response to internal format
  fromExternal(external: BlogPost): InternalBlogPost {
    return {
      id: external.id,
      title: external.title,
      excerpt: external.excerpt,
      content: external.content,
      author: external.author,
      publishedAt: safeDateParse(external.publishedAt) || new Date(),
      category: external.category,
      tags: Array.isArray(external.tags) ? external.tags : [],
      readTime: external.readTime || 5,
      isPublished: external.isPublished ?? true,
      slug: external.slug || null,
      metaTitle: external.metaTitle || null,
      metaDescription: external.metaDescription || null,
      seoKeywords: Array.isArray(external.seoKeywords) ? external.seoKeywords : [],
      focusKeyword: external.focusKeyword || null,
      ogImage: external.ogImage || null,
      ogDescription: external.ogDescription || null,
      canonicalUrl: external.canonicalUrl || null
    };
  },

  // Transform internal format to external API format
  toExternal(internal: Partial<InternalBlogPost>): Omit<BlogPost, 'id' | 'publishedAt'> {
    return {
      title: internal.title || '',
      excerpt: internal.excerpt || '',
      content: internal.content || '',
      author: internal.author || '',
      category: internal.category || '',
      tags: internal.tags || [],
      readTime: internal.readTime || 5,
      isPublished: internal.isPublished ?? true,
      slug: internal.slug || '',
      metaTitle: internal.metaTitle || '',
      metaDescription: internal.metaDescription || '',
      seoKeywords: internal.seoKeywords || [],
      focusKeyword: internal.focusKeyword || '',
      ogImage: internal.ogImage || '',
      ogDescription: internal.ogDescription || '',
      canonicalUrl: internal.canonicalUrl || ''
    };
  }
};

/**
 * Festival Adapters
 */
export const festivalAdapters = {
  // Transform external API response to internal format
  fromExternal(external: Festival): InternalFestival {
    // Parse lunarDate string (e.g., "15/8" or "15/8/2024")
    const lunarDateParts = external.lunarDate?.split('/') || [];
    const lunarDay = parseInt(lunarDateParts[0]) || 1;
    const lunarMonth = parseInt(lunarDateParts[1]) || 1;

    return {
      id: external.id,
      name: external.name,
      lunarDay,
      lunarMonth,
      description: external.description || null,
      isImportant: external.isNationalHoliday || false
    };
  },

  // Transform internal format to external API format
  toExternal(internal: Partial<InternalFestival>): Omit<Festival, 'id'> {
    return {
      name: internal.name || '',
      description: internal.description || '',
      lunarDate: `${internal.lunarDay || 1}/${internal.lunarMonth || 1}`,
      solarDate: undefined,
      category: 'traditional',
      region: undefined,
      isNationalHoliday: internal.isImportant || false
    };
  }
};

/**
 * Lunar Date Adapters
 */
export const lunarDateAdapters = {
  // Transform external API response to internal format
  fromExternal(external: LunarDate): InternalLunarDate {
    return {
      id: external.id,
      solarDate: ensureDateString(external.solarDate) || new Date().toISOString().split('T')[0],
      lunarDay: external.lunarDay || 1,
      lunarMonth: external.lunarMonth || 1,
      lunarYear: external.lunarYear || new Date().getFullYear(),
      canChi: external.canChi || '',
      zodiacAnimal: external.zodiac || '',
      isLeapMonth: false // External API doesn't seem to provide this
    };
  },

  // Transform internal format to external API format
  toExternal(internal: { solarDate: string }): { solarDate: string } {
    return {
      solarDate: internal.solarDate
    };
  }
};

/**
 * Astrology Reading Adapters
 */
export const astrologyAdapters = {
  // Transform external API response to internal format
  fromExternal(external: AstrologyReading): InternalAstrologyReading {
    // Parse the reading string to extract pillars
    const readingParts = external.reading?.split(' ') || [];
    const canChiParts = external.canChi?.split(' ') || readingParts;

    return {
      id: external.id,
      birthDate: ensureDateString(external.birthDate) || new Date().toISOString().split('T')[0],
      birthTime: external.birthTime || '12:00',
      gender: external.gender || 'male',
      birthPlace: null,
      yearPillar: canChiParts[0] || '',
      monthPillar: canChiParts[1] || '',
      dayPillar: canChiParts[2] || '',
      hourPillar: canChiParts[3] || '',
      destiny: external.reading || '',
      zodiacAnimal: external.zodiac || '',
      personality: null
    };
  },

  // Transform internal format to external API format
  toExternal(internal: Partial<InternalAstrologyReading>): Omit<AstrologyReading, 'id' | 'createdAt'> {
    return {
      userId: undefined,
      birthDate: internal.birthDate || new Date().toISOString().split('T')[0],
      birthTime: internal.birthTime || '12:00',
      gender: (internal.gender as 'male' | 'female') || 'male',
      reading: internal.destiny || `${internal.yearPillar || ''} ${internal.monthPillar || ''} ${internal.dayPillar || ''} ${internal.hourPillar || ''}`.trim(),
      lunarBirthDate: '',
      canChi: `${internal.yearPillar || ''} ${internal.monthPillar || ''} ${internal.dayPillar || ''} ${internal.hourPillar || ''}`.trim(),
      zodiac: internal.zodiacAnimal || ''
    };
  }
};

/**
 * Generic error handler for API routes
 */
export function handleApiError(error: unknown, fallbackMessage: string = "An error occurred") {
  console.error("API Error:", error);
  
  // Handle structured API errors
  if (error && typeof error === 'object' && 'status' in error) {
    const apiError = error as ApiError;
    
    return {
      error: apiError.message || fallbackMessage,
      status: apiError.status,
      details: apiError.details
    };
  }
  
  // Handle Zod validation errors
  if (error && typeof error === 'object' && 'name' in error && error.name === 'ZodError') {
    return {
      error: "Invalid data format",
      status: 400,
      details: error
    };
  }
  
  // Handle generic errors
  return {
    error: error instanceof Error ? error.message : fallbackMessage,
    status: 500,
    details: error
  };
}

/**
 * Type guards for checking data format
 */
export const typeGuards = {
  isValidDate(value: unknown): value is Date {
    return value instanceof Date && !isNaN(value.getTime());
  },

  isValidDateString(value: unknown): value is string {
    return typeof value === 'string' && !isNaN(new Date(value).getTime());
  },

  isNonEmptyString(value: unknown): value is string {
    return typeof value === 'string' && value.trim().length > 0;
  },

  isValidEmail(value: unknown): value is string {
    return typeof value === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }
};