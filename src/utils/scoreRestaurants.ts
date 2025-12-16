import { Restaurant, ParsedQuery, RecommendationResult } from '@/types/restaurant';
import { SEARCH_CONFIG } from '@/lib/config';
import { generateExplanation } from './generateExplanation';

export function scoreRestaurants(
  restaurants: Restaurant[], 
  parsedQuery: ParsedQuery
): RecommendationResult[] {
  const scoredResults: RecommendationResult[] = restaurants.map(restaurant => {
    const score = calculateRestaurantScore(restaurant, parsedQuery);
    const explanation = generateExplanation(restaurant, parsedQuery, score);
    const matchedCriteria = getMatchedCriteria(restaurant, parsedQuery);

    return {
      restaurant,
      score,
      explanation,
      matchedCriteria
    };
  });

  return scoredResults
    .filter(result => result.score >= SEARCH_CONFIG.MIN_SCORE_THRESHOLD)
    .sort((a, b) => b.score - a.score)
    .slice(0, SEARCH_CONFIG.MAX_RESULTS);
}

function calculateRestaurantScore(restaurant: Restaurant, query: ParsedQuery): number {
  let score = 0;
  let maxPossibleScore = 0;

  const ratingWeight = 0.2;
  score += (restaurant.rating / 5) * ratingWeight;
  maxPossibleScore += ratingWeight;

  const moodWeight = 0.25;
  const moodScore = calculateMoodScore(restaurant, query.moodKeywords);
  score += moodScore * moodWeight;
  maxPossibleScore += moodWeight;

  const adjectiveWeight = 0.2;
  const adjectiveScore = calculateAdjectiveScore(restaurant, query.foodAdjectives);
  score += adjectiveScore * adjectiveWeight;
  maxPossibleScore += adjectiveWeight;

  const budgetWeight = 0.15;
  const budgetScore = calculateBudgetScore(restaurant, query.budgetHints);
  score += budgetScore * budgetWeight;
  maxPossibleScore += budgetWeight;

  const cuisineWeight = 0.1;
  const cuisineScore = calculateCuisineScore(restaurant, query.cuisinePreferences);
  score += cuisineScore * cuisineWeight;
  maxPossibleScore += cuisineWeight;

  const dietWeight = 0.05;
  const dietScore = calculateDietScore(restaurant, query.dietaryRestrictions);
  score += dietScore * dietWeight;
  maxPossibleScore += dietWeight;

  const distanceWeight = 0.05;
  const distanceScore = calculateDistanceScore(restaurant);
  score += distanceScore * distanceWeight;
  maxPossibleScore += distanceWeight;

  return maxPossibleScore > 0 ? score / maxPossibleScore : 0;
}

function calculateMoodScore(restaurant: Restaurant, moodKeywords: string[]): number {
  if (moodKeywords.length === 0) return 0.5;

  let matches = 0;
  const totalMoods = moodKeywords.length;

  moodKeywords.forEach(mood => {
    switch (mood) {
      case 'comfort':
        if (restaurant.vibeTags.some(tag => 
          ['comfort food', 'homely', 'cozy', 'warm'].includes(tag))) {
          matches++;
        }
        break;
      case 'celebration':
        if (restaurant.vibeTags.some(tag => 
          ['celebration', 'party', 'special', 'group friendly'].includes(tag))) {
          matches++;
        }
        break;
      case 'quick':
        if (restaurant.vibeTags.some(tag => 
          ['quick bite', 'fast', 'takeaway'].includes(tag)) || 
          restaurant.approxWaitingTimeMinutes <= 10) {
          matches++;
        }
        break;
      case 'date':
        if (restaurant.vibeTags.some(tag => 
          ['date spot', 'romantic', 'cozy', 'instagram worthy'].includes(tag))) {
          matches++;
        }
        break;
      case 'study':
        if (restaurant.vibeTags.some(tag => 
          ['wifi', 'study friendly', 'quiet', 'cozy'].includes(tag))) {
          matches++;
        }
        break;
      case 'group':
        if (restaurant.vibeTags.some(tag => 
          ['group friendly', 'family friendly', 'spacious'].includes(tag))) {
          matches++;
        }
        break;
      case 'late':
        if (restaurant.isOpenLate) {
          matches++;
        }
        break;
    }
  });

  return totalMoods > 0 ? matches / totalMoods : 0;
}

function calculateAdjectiveScore(restaurant: Restaurant, adjectives: string[]): number {
  if (adjectives.length === 0) return 0.5;

  let matches = 0;
  const totalAdjectives = adjectives.length;

  adjectives.forEach(adjective => {
    switch (adjective) {
      case 'spicy':
        if (restaurant.cuisine.some(c => 
          ['Indian', 'Chinese', 'Thai', 'Mexican'].includes(c)) ||
          restaurant.popularDishes.some(dish => 
            dish.toLowerCase().includes('spicy') || 
            dish.toLowerCase().includes('masala'))) {
          matches++;
        }
        break;
      case 'sweet':
        if (restaurant.cuisine.includes('Desserts') ||
          restaurant.vibeTags.includes('sweet tooth') ||
          restaurant.popularDishes.some(dish => 
            ['ice cream', 'cake', 'dessert', 'sweet'].some(sweet => 
              dish.toLowerCase().includes(sweet)))) {
          matches++;
        }
        break;
      case 'cheesy':
        if (restaurant.cuisine.some(c => ['Italian', 'Pizza', 'Continental'].includes(c)) ||
          restaurant.popularDishes.some(dish => 
            dish.toLowerCase().includes('cheese') || 
            dish.toLowerCase().includes('pizza'))) {
          matches++;
        }
        break;
      case 'crispy':
        if (restaurant.vibeTags.includes('crispy') ||
          restaurant.popularDishes.some(dish => 
            ['dosa', 'fried', 'crispy', 'fries'].some(crispy => 
              dish.toLowerCase().includes(crispy)))) {
          matches++;
        }
        break;
      case 'healthy':
        if (restaurant.vibeTags.some(tag => 
          ['healthy', 'fresh', 'diet friendly', 'clean eating'].includes(tag)) ||
          restaurant.cuisine.some(c => ['Salads', 'Healthy'].includes(c))) {
          matches++;
        }
        break;
      case 'filling':
        if (restaurant.vibeTags.some(tag => 
          ['filling', 'hearty', 'unlimited meals'].includes(tag)) ||
          restaurant.popularDishes.some(dish => 
            ['thali', 'biryani', 'unlimited'].some(filling => 
              dish.toLowerCase().includes(filling)))) {
          matches++;
        }
        break;
    }
  });

  return totalAdjectives > 0 ? matches / totalAdjectives : 0;
}

function calculateBudgetScore(restaurant: Restaurant, budgetHints: string[]): number {
  if (budgetHints.length === 0) return 0.5;

  let matches = 0;
  const totalHints = budgetHints.length;

  budgetHints.forEach(hint => {
    switch (hint) {
      case 'cheap':
        if (restaurant.priceRange === 'budget' || restaurant.avgCostForTwo <= 200) {
          matches++;
        }
        break;
      case 'expensive':
        if (restaurant.priceRange === 'premium' || restaurant.avgCostForTwo >= 400) {
          matches++;
        }
        break;
      case 'midrange':
        if (restaurant.priceRange === 'mid-range' || 
          (restaurant.avgCostForTwo > 200 && restaurant.avgCostForTwo < 400)) {
          matches++;
        }
        break;
    }
  });

  return totalHints > 0 ? matches / totalHints : 0;
}

function calculateCuisineScore(restaurant: Restaurant, cuisinePrefs: string[]): number {
  if (cuisinePrefs.length === 0) return 0.5;

  let matches = 0;
  const totalPrefs = cuisinePrefs.length;

  cuisinePrefs.forEach(pref => {
    const prefLower = pref.toLowerCase();
    if (restaurant.cuisine.some(c => c.toLowerCase().includes(prefLower))) {
      matches++;
    }
  });

  return totalPrefs > 0 ? matches / totalPrefs : 0;
}

function calculateDietScore(restaurant: Restaurant, dietRestrictions: string[]): number {
  if (dietRestrictions.length === 0) return 0.5;

  let matches = 0;
  const totalRestrictions = dietRestrictions.length;

  dietRestrictions.forEach(restriction => {
    if (restaurant.dietTags.some(tag => tag.toLowerCase().includes(restriction.toLowerCase()))) {
      matches++;
    }
  });

  return totalRestrictions > 0 ? matches / totalRestrictions : 0;
}

function calculateDistanceScore(restaurant: Restaurant): number {
  const maxDistance = SEARCH_CONFIG.DEFAULT_RADIUS_KM;
  const distance = restaurant.location.distanceFromCampusKm;
  
  if (distance <= 1) return 1;
  if (distance >= maxDistance) return 0.1;
  
  return Math.max(0.1, 1 - (distance / maxDistance));
}

function getMatchedCriteria(restaurant: Restaurant, query: ParsedQuery): string[] {
  const criteria: string[] = [];

  query.moodKeywords.forEach(mood => {
    if (calculateMoodScore(restaurant, [mood]) > 0) {
      criteria.push(`${mood} vibe`);
    }
  });

  query.foodAdjectives.forEach(adj => {
    if (calculateAdjectiveScore(restaurant, [adj]) > 0) {
      criteria.push(`${adj} food`);
    }
  });

  query.budgetHints.forEach(budget => {
    if (calculateBudgetScore(restaurant, [budget]) > 0) {
      criteria.push(`${budget} pricing`);
    }
  });

  query.cuisinePreferences.forEach(cuisine => {
    if (restaurant.cuisine.some(c => c.toLowerCase().includes(cuisine.toLowerCase()))) {
      criteria.push(`${cuisine} cuisine`);
    }
  });

  if (restaurant.location.distanceFromCampusKm <= 1) {
    criteria.push('very close to campus');
  }

  if (restaurant.rating >= 4.0) {
    criteria.push('highly rated');
  }

  return criteria;
}
