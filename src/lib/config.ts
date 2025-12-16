import { AppConfig } from '@/types/restaurant';

export const appConfig: AppConfig = {
  campusLocation: {
    latitude: 11.0168,
    longitude: 76.9558,
    name: "PSG College of Technology"
  },
  searchRadius: 5000,
  maxExternalResults: 10,
  fallbackToLocalOnly: true
};

export const API_ENDPOINTS = {
  RESTAURANTS: '/api/restaurants',
  EXTERNAL_RESTAURANTS: '/api/external-restaurants',
  SEARCH: '/api/search',
  RECOMMENDATIONS: '/api/recommendations'
};

export const ENV = {
  GOOGLE_PLACES_API_KEY: process.env.GOOGLE_PLACES_API_KEY || 'AIzaSyAc8vUyw_iKuqonfEpiZW0RZRKi3dajfvs',
  FOURSQUARE_API_KEY: process.env.FOURSQUARE_API_KEY || '',
  NODE_ENV: process.env.NODE_ENV || 'development'
};

export const SEARCH_CONFIG = {
  MAX_RESULTS: 5,
  MIN_SCORE_THRESHOLD: 0.3,
  DEFAULT_RADIUS_KM: 3,
  SURPRISE_ME_MIN_RATING: 4.0
};

export const KEYWORD_MAPPINGS = {
  MOOD: {
    comfort: ['comfort', 'cozy', 'homely', 'warm', 'relaxing'],
    celebration: ['celebration', 'party', 'special', 'birthday', 'anniversary'],
    quick: ['quick', 'fast', 'hurry', 'rush', 'grab'],
    date: ['date', 'romantic', 'intimate', 'couple'],
    study: ['study', 'wifi', 'quiet', 'work', 'laptop'],
    group: ['group', 'friends', 'team', 'gang', 'together'],
    late: ['late', 'night', 'midnight', 'after hours']
  },
  FOOD_ADJECTIVES: {
    spicy: ['spicy', 'hot', 'fiery', 'chili', 'masala'],
    sweet: ['sweet', 'dessert', 'sugar', 'candy', 'chocolate'],
    cheesy: ['cheesy', 'cheese', 'creamy', 'rich'],
    crispy: ['crispy', 'crunchy', 'fried', 'golden'],
    healthy: ['healthy', 'fresh', 'light', 'diet', 'salad'],
    filling: ['filling', 'heavy', 'hearty', 'satisfying']
  },
  BUDGET: {
    cheap: ['cheap', 'budget', 'affordable', 'inexpensive', 'under'],
    expensive: ['expensive', 'premium', 'costly', 'pricey'],
    midrange: ['mid-range', 'moderate', 'reasonable']
  },
  CUISINE: {
    indian: ['indian', 'desi', 'curry', 'masala'],
    chinese: ['chinese', 'noodles', 'fried rice', 'manchurian'],
    italian: ['italian', 'pizza', 'pasta', 'continental'],
    southindian: ['south indian', 'dosa', 'idli', 'sambar'],
    northindian: ['north indian', 'punjabi', 'naan', 'dal']
  },
  DIETARY: {
    veg: ['veg', 'vegetarian', 'pure veg'],
    nonveg: ['non-veg', 'chicken', 'mutton', 'meat'],
    vegan: ['vegan', 'plant based'],
    jain: ['jain', 'no onion', 'no garlic']
  }
};
