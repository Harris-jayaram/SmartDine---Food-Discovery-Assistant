export interface Restaurant {
  id: string;
  name: string;
  cuisine: string[];
  priceRange: "budget" | "mid-range" | "premium";
  avgCostForTwo: number;
  location: {
    area: string;
    distanceFromCampusKm: number;
    latitude?: number;
    longitude?: number;
  };
  rating: number;
  popularDishes: string[];
  vibeTags: string[];
  dietTags: string[];
  isOpenLate: boolean;
  shortDescription: string;
  reviewSnippet: string;
  approxWaitingTimeMinutes: number;
  imageUrl: string;
  source: "local" | "external";
  externalId?: string;
}

export interface ParsedQuery {
  moodKeywords: string[];
  foodAdjectives: string[];
  budgetHints: string[];
  groupHints: string[];
  cuisinePreferences: string[];
  dietaryRestrictions: string[];
  originalQuery: string;
}

export interface RecommendationResult {
  restaurant: Restaurant;
  score: number;
  explanation: string;
  matchedCriteria: string[];
}

export interface SearchFilters {
  maxDistance?: number;
  priceRange?: Restaurant['priceRange'][];
  cuisines?: string[];
  dietTags?: string[];
  vibeTags?: string[];
  minRating?: number;
  openLate?: boolean;
}

export interface GooglePlacesResult {
  place_id: string;
  name: string;
  rating?: number;
  price_level?: number;
  types: string[];
  vicinity: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  photos?: Array<{
    photo_reference: string;
  }>;
}

export interface FoursquareResult {
  fsq_id: string;
  name: string;
  categories: Array<{
    id: number;
    name: string;
    short_name: string;
  }>;
  location: {
    address?: string;
    locality?: string;
    region?: string;
    distance?: number;
  };
  rating?: number;
  price?: number;
}

export interface AppConfig {
  campusLocation: {
    latitude: number;
    longitude: number;
    name: string;
  };
  searchRadius: number;
  maxExternalResults: number;
  fallbackToLocalOnly: boolean;
}
