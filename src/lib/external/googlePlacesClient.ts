import { GooglePlacesResult, Restaurant } from '@/types/restaurant';
import { appConfig, ENV } from '@/lib/config';

export class GooglePlacesClient {
  private apiKey: string;
  private baseUrl = 'https://maps.googleapis.com/maps/api/place';

  constructor() {
    this.apiKey = ENV.GOOGLE_PLACES_API_KEY;
    if (!this.apiKey) {
      console.warn('Google Places API key not found. External restaurant fetching will be disabled.');
    }
  }

  isAvailable(): boolean {
    return !!this.apiKey;
  }

  async fetchNearbyRestaurants(): Promise<GooglePlacesResult[]> {
    if (!this.isAvailable()) {
      throw new Error('Google Places API key not configured');
    }

    const { latitude, longitude } = appConfig.campusLocation;
    const radius = appConfig.searchRadius;

    const url = `${this.baseUrl}/nearbysearch/json?` +
      `location=${latitude},${longitude}&` +
      `radius=${radius}&` +
      `type=restaurant&` +
      `key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
      }

      return data.results || [];
    } catch (error) {
      console.error('Error fetching from Google Places API:', error);
      throw error;
    }
  }

  async searchRestaurants(query: string): Promise<GooglePlacesResult[]> {
    if (!this.isAvailable()) {
      throw new Error('Google Places API key not configured');
    }

    const { latitude, longitude } = appConfig.campusLocation;
    const radius = appConfig.searchRadius;

    const url = `${this.baseUrl}/textsearch/json?` +
      `query=${encodeURIComponent(query + ' restaurant')}&` +
      `location=${latitude},${longitude}&` +
      `radius=${radius}&` +
      `key=${this.apiKey}`;

    try {
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Google Places API error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      if (data.status !== 'OK' && data.status !== 'ZERO_RESULTS') {
        throw new Error(`Google Places API error: ${data.status} - ${data.error_message || 'Unknown error'}`);
      }

      return data.results || [];
    } catch (error) {
      console.error('Error searching Google Places API:', error);
      throw error;
    }
  }

  normalizeToRestaurant(place: GooglePlacesResult): Restaurant {
    const distance = this.calculateDistance(
      appConfig.campusLocation.latitude,
      appConfig.campusLocation.longitude,
      place.geometry.location.lat,
      place.geometry.location.lng
    );

    const priceRange = this.mapPriceLevel(place.price_level);
    const cuisine = this.deriveCuisineFromTypes(place.types);
    const vibeTags = this.deriveVibeTagsFromTypes(place.types);
    const avgCostForTwo = this.estimateCostForTwo(place.price_level);

    return {
      id: `google-${place.place_id}`,
      name: place.name,
      cuisine,
      priceRange,
      avgCostForTwo,
      location: {
        area: place.vicinity || 'Unknown Area',
        distanceFromCampusKm: Math.round(distance * 10) / 10,
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng
      },
      rating: place.rating || 3.5,
      popularDishes: this.generatePopularDishes(cuisine),
      vibeTags,
      dietTags: this.deriveDietTags(place.types, place.name),
      isOpenLate: this.estimateOpenLate(place.types),
      shortDescription: `${cuisine.join(', ')} restaurant in ${place.vicinity}`,
      reviewSnippet: this.generateReviewSnippet(place.name, cuisine[0]),
      approxWaitingTimeMinutes: this.estimateWaitingTime(place.rating, priceRange),
      imageUrl: this.getPlaceImageUrl(place),
      source: 'external',
      externalId: place.place_id
    };
  }

  private calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
    const R = 6371;
    const dLat = this.deg2rad(lat2 - lat1);
    const dLon = this.deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  }

  private deg2rad(deg: number): number {
    return deg * (Math.PI/180);
  }

  private mapPriceLevel(priceLevel?: number): Restaurant['priceRange'] {
    if (!priceLevel) return 'budget';
    switch (priceLevel) {
      case 1: return 'budget';
      case 2: return 'budget';
      case 3: return 'mid-range';
      case 4: return 'premium';
      default: return 'budget';
    }
  }

  private estimateCostForTwo(priceLevel?: number): number {
    if (!priceLevel) return 200;
    switch (priceLevel) {
      case 1: return 150;
      case 2: return 250;
      case 3: return 400;
      case 4: return 600;
      default: return 200;
    }
  }

  private deriveCuisineFromTypes(types: string[]): string[] {
    const cuisineMap: { [key: string]: string } = {
      'chinese_restaurant': 'Chinese',
      'indian_restaurant': 'Indian',
      'italian_restaurant': 'Italian',
      'japanese_restaurant': 'Japanese',
      'mexican_restaurant': 'Mexican',
      'thai_restaurant': 'Thai',
      'american_restaurant': 'American',
      'fast_food_restaurant': 'Fast Food',
      'pizza_restaurant': 'Pizza',
      'seafood_restaurant': 'Seafood',
      'vegetarian_restaurant': 'Vegetarian',
      'bakery': 'Bakery',
      'cafe': 'Cafe'
    };

    const cuisines = types
      .map(type => cuisineMap[type])
      .filter(Boolean);

    return cuisines.length > 0 ? cuisines : ['Multi-cuisine'];
  }

  private deriveVibeTagsFromTypes(types: string[]): string[] {
    const tags: string[] = [];
    
    if (types.includes('cafe')) tags.push('cozy', 'wifi');
    if (types.includes('fast_food_restaurant')) tags.push('quick bite', 'budget friendly');
    if (types.includes('bar')) tags.push('late night', 'group friendly');
    if (types.includes('bakery')) tags.push('sweet tooth', 'fresh baked');
    if (types.includes('meal_takeaway')) tags.push('takeaway', 'quick bite');
    
    if (tags.length === 0) {
      tags.push('casual dining');
    }

    return tags;
  }

  private deriveDietTags(types: string[], name: string): string[] {
    const tags: string[] = [];
    
    if (types.includes('vegetarian_restaurant') || name.toLowerCase().includes('veg')) {
      tags.push('veg');
    } else {
      tags.push('veg', 'non-veg');
    }

    return tags;
  }

  private estimateOpenLate(types: string[]): boolean {
    return types.includes('bar') || 
           types.includes('fast_food_restaurant') || 
           types.includes('cafe');
  }

  private generatePopularDishes(cuisine: string[]): string[] {
    const dishMap: { [key: string]: string[] } = {
      'Chinese': ['Fried Rice', 'Noodles', 'Manchurian'],
      'Indian': ['Curry', 'Naan', 'Biryani'],
      'Italian': ['Pizza', 'Pasta', 'Garlic Bread'],
      'Fast Food': ['Burger', 'Fries', 'Sandwich'],
      'Cafe': ['Coffee', 'Sandwich', 'Pastry'],
      'Bakery': ['Fresh Bread', 'Cakes', 'Pastries']
    };

    const dishes = cuisine
      .flatMap(c => dishMap[c] || [])
      .slice(0, 3);

    return dishes.length > 0 ? dishes : ['Popular Items', 'House Special'];
  }

  private generateReviewSnippet(name: string, cuisine: string): string {
    const snippets = [
      `Great ${cuisine.toLowerCase()} food with good service.`,
      `Popular spot with consistent quality and taste.`,
      `Well-known for their authentic flavors and ambiance.`,
      `Recommended by locals for good food and value.`
    ];
    
    return snippets[Math.floor(Math.random() * snippets.length)];
  }

  private estimateWaitingTime(rating?: number, priceRange?: Restaurant['priceRange']): number {
    let baseTime = 15;
    
    if (rating && rating > 4.0) baseTime += 5;
    if (priceRange === 'premium') baseTime += 10;
    if (priceRange === 'budget') baseTime -= 5;
    
    return Math.max(5, baseTime);
  }

  private getPlaceImageUrl(place: GooglePlacesResult): string {
    const placeholderImages = [
      'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400',
      'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400'
    ];
    
    return placeholderImages[Math.floor(Math.random() * placeholderImages.length)];
  }
}
