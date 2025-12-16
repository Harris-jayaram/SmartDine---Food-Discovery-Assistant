import { ParsedQuery } from '@/types/restaurant';
import { KEYWORD_MAPPINGS } from '@/lib/config';

export function parseQuery(query: string): ParsedQuery {
  const lowerQuery = query.toLowerCase();
  
  const parsed: ParsedQuery = {
    moodKeywords: [],
    foodAdjectives: [],
    budgetHints: [],
    groupHints: [],
    cuisinePreferences: [],
    dietaryRestrictions: [],
    originalQuery: query
  };

  Object.entries(KEYWORD_MAPPINGS.MOOD).forEach(([mood, keywords]) => {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      parsed.moodKeywords.push(mood);
    }
  });

  Object.entries(KEYWORD_MAPPINGS.FOOD_ADJECTIVES).forEach(([adjective, keywords]) => {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      parsed.foodAdjectives.push(adjective);
    }
  });

  Object.entries(KEYWORD_MAPPINGS.BUDGET).forEach(([budget, keywords]) => {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      parsed.budgetHints.push(budget);
    }
  });

  Object.entries(KEYWORD_MAPPINGS.CUISINE).forEach(([cuisine, keywords]) => {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      parsed.cuisinePreferences.push(cuisine);
    }
  });

  Object.entries(KEYWORD_MAPPINGS.DIETARY).forEach(([diet, keywords]) => {
    if (keywords.some(keyword => lowerQuery.includes(keyword))) {
      parsed.dietaryRestrictions.push(diet);
    }
  });

  const groupPatterns = [
    { pattern: /\b(friends?|group|gang|team)\b/, hint: 'group' },
    { pattern: /\b(date|romantic|couple)\b/, hint: 'date' },
    { pattern: /\b(family|parents?|relatives?)\b/, hint: 'family' },
    { pattern: /\b(alone|solo|myself)\b/, hint: 'solo' }
  ];

  groupPatterns.forEach(({ pattern, hint }) => {
    if (pattern.test(lowerQuery)) {
      parsed.groupHints.push(hint);
    }
  });

  const priceMatch = lowerQuery.match(/(?:under|below|less than|within)\s*₹?\s*(\d+)/);
  if (priceMatch) {
    const amount = parseInt(priceMatch[1]);
    if (amount <= 200) {
      parsed.budgetHints.push('cheap');
    } else if (amount <= 400) {
      parsed.budgetHints.push('midrange');
    }
  }

  return parsed;
}

export function extractKeyPhrases(query: string): string[] {
  const phrases: string[] = [];
  const lowerQuery = query.toLowerCase();

  const foodPhrases = [
    'comfort food', 'street food', 'fast food', 'home food',
    'spicy food', 'sweet food', 'healthy food', 'junk food',
    'north indian', 'south indian', 'chinese food', 'italian food',
    'quick bite', 'heavy meal', 'light meal', 'late night',
    'group friendly', 'date spot', 'family place'
  ];

  foodPhrases.forEach(phrase => {
    if (lowerQuery.includes(phrase)) {
      phrases.push(phrase);
    }
  });

  return phrases;
}

export function analyzeQueryContext(query: string): {
  sentiment: 'positive' | 'neutral' | 'negative';
  urgency: 'low' | 'medium' | 'high';
  specificity: 'vague' | 'moderate' | 'specific';
} {
  const lowerQuery = query.toLowerCase();

  const positiveWords = ['good', 'great', 'amazing', 'delicious', 'tasty', 'love', 'favorite'];
  const negativeWords = ['bad', 'terrible', 'awful', 'hate', 'disgusting', 'worst'];
  
  const hasPositive = positiveWords.some(word => lowerQuery.includes(word));
  const hasNegative = negativeWords.some(word => lowerQuery.includes(word));
  
  let sentiment: 'positive' | 'neutral' | 'negative' = 'neutral';
  if (hasPositive && !hasNegative) sentiment = 'positive';
  if (hasNegative && !hasPositive) sentiment = 'negative';

  const urgentWords = ['quick', 'fast', 'hurry', 'rush', 'asap', 'now', 'immediately'];
  const urgency = urgentWords.some(word => lowerQuery.includes(word)) ? 'high' : 'low';

  const specificWords = ['exactly', 'specifically', 'particular', 'precise'];
  const hasSpecificCuisine = Object.values(KEYWORD_MAPPINGS.CUISINE).flat()
    .some(cuisine => lowerQuery.includes(cuisine));
  const hasSpecificMood = Object.values(KEYWORD_MAPPINGS.MOOD).flat()
    .some(mood => lowerQuery.includes(mood));
  
  let specificity: 'vague' | 'moderate' | 'specific' = 'vague';
  if (hasSpecificCuisine || hasSpecificMood || specificWords.some(word => lowerQuery.includes(word))) {
    specificity = 'specific';
  } else if (query.split(' ').length > 3) {
    specificity = 'moderate';
  }

  return { sentiment, urgency, specificity };
}
