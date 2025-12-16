import { Restaurant, ParsedQuery } from '@/types/restaurant';

export function generateExplanation(
  restaurant: Restaurant, 
  query: ParsedQuery, 
  score: number
): string {
  const explanationParts: string[] = [];
  
  const intro = `Try **${restaurant.name}**`;
  
  const reasons = generateReasons(restaurant, query);
  
  const highlight = generateHighlight(restaurant);
  
  if (reasons.length > 0) {
    const reasonText = reasons.length === 1 
      ? reasons[0]
      : `${reasons.slice(0, -1).join(', ')} and ${reasons[reasons.length - 1]}`;
    
    explanationParts.push(`${intro} because ${reasonText}`);
  } else {
    explanationParts.push(`${intro} - it's a great choice`);
  }
  
  if (highlight) {
    explanationParts.push(highlight);
  }
  
  return explanationParts.join('. ') + '.';
}

function generateReasons(restaurant: Restaurant, query: ParsedQuery): string[] {
  const reasons: string[] = [];
  
  if (query.budgetHints.includes('cheap') && restaurant.priceRange === 'budget') {
    reasons.push(`it's budget-friendly at ₹${restaurant.avgCostForTwo} for two`);
  } else if (query.budgetHints.includes('expensive') && restaurant.priceRange === 'premium') {
    reasons.push('it offers premium dining experience');
  }
  
  query.moodKeywords.forEach(mood => {
    switch (mood) {
      case 'comfort':
        if (restaurant.vibeTags.some(tag => ['comfort food', 'homely', 'cozy'].includes(tag))) {
          reasons.push('it serves comforting, homely food');
        }
        break;
      case 'celebration':
        if (restaurant.vibeTags.includes('celebration') || restaurant.vibeTags.includes('group friendly')) {
          reasons.push('it\'s perfect for celebrations and group gatherings');
        }
        break;
      case 'quick':
        if (restaurant.approxWaitingTimeMinutes <= 10 || restaurant.vibeTags.includes('quick bite')) {
          reasons.push(`you can get food quickly (${restaurant.approxWaitingTimeMinutes} min wait)`);
        }
        break;
      case 'date':
        if (restaurant.vibeTags.includes('date spot') || restaurant.vibeTags.includes('cozy')) {
          reasons.push('it has a romantic, cozy ambiance perfect for dates');
        }
        break;
      case 'late':
        if (restaurant.isOpenLate) {
          reasons.push('it stays open late for your midnight cravings');
        }
        break;
    }
  });
  
  query.foodAdjectives.forEach(adj => {
    switch (adj) {
      case 'spicy':
        if (restaurant.cuisine.some(c => ['Indian', 'Chinese', 'Thai'].includes(c))) {
          reasons.push('they make deliciously spicy dishes');
        }
        break;
      case 'cheesy':
        if (restaurant.cuisine.includes('Italian') || restaurant.cuisine.includes('Pizza')) {
          reasons.push('their cheesy dishes are absolutely divine');
        }
        break;
      case 'healthy':
        if (restaurant.vibeTags.includes('healthy') || restaurant.cuisine.includes('Salads')) {
          reasons.push('they focus on fresh, healthy ingredients');
        }
        break;
      case 'filling':
        if (restaurant.vibeTags.includes('filling') || restaurant.popularDishes.some(d => d.includes('Thali'))) {
          reasons.push('their portions are generous and very filling');
        }
        break;
    }
  });
  
  query.cuisinePreferences.forEach(cuisine => {
    if (restaurant.cuisine.some(c => c.toLowerCase().includes(cuisine.toLowerCase()))) {
      reasons.push(`you wanted ${cuisine.toLowerCase()} food and they specialize in it`);
    }
  });
  
  if (restaurant.location.distanceFromCampusKm <= 1) {
    reasons.push(`it's super close to campus (${restaurant.location.distanceFromCampusKm}km away)`);
  }
  
  if (restaurant.rating >= 4.5) {
    reasons.push(`it has excellent ratings (${restaurant.rating}/5)`);
  } else if (restaurant.rating >= 4.0) {
    reasons.push(`it's highly rated by students (${restaurant.rating}/5)`);
  }
  
  return reasons;
}

function generateHighlight(restaurant: Restaurant): string {
  const highlights: string[] = [];
  
  if (restaurant.popularDishes.length > 0) {
    const dish = restaurant.popularDishes[0];
    highlights.push(`Their ${dish} is especially popular among students`);
  }
  
  if (restaurant.vibeTags.includes('unlimited meals')) {
    highlights.push('They offer unlimited meals - perfect when you\'re really hungry');
  }
  
  if (restaurant.vibeTags.includes('instagram worthy')) {
    highlights.push('The presentation is Instagram-worthy too');
  }
  
  if (restaurant.isOpenLate && restaurant.vibeTags.includes('late night')) {
    highlights.push('Plus, they\'re open late for those midnight study sessions');
  }
  
  if (highlights.length === 0 && restaurant.reviewSnippet) {
    highlights.push(restaurant.reviewSnippet);
  }
  
  return highlights[0] || '';
}

export function generateSurpriseExplanation(restaurant: Restaurant): string {
  const surpriseIntros = [
    'Feeling indecisive? Here\'s a great surprise:',
    'Let me pick something special for you:',
    'How about trying something new:',
    'Here\'s a delightful surprise:',
    'Trust me on this one:'
  ];
  
  const intro = surpriseIntros[Math.floor(Math.random() * surpriseIntros.length)];
  
  const features: string[] = [];
  
  if (restaurant.rating >= 4.0) {
    features.push(`highly rated (${restaurant.rating}/5)`);
  }
  
  if (restaurant.location.distanceFromCampusKm <= 1.5) {
    features.push('conveniently located');
  }
  
  if (restaurant.priceRange === 'budget') {
    features.push('budget-friendly');
  }
  
  if (restaurant.vibeTags.includes('student favorite')) {
    features.push('popular with students');
  }
  
  const featureText = features.length > 0 
    ? ` It's ${features.join(', ')}`
    : '';
  
  const dishHighlight = restaurant.popularDishes.length > 0
    ? ` Try their ${restaurant.popularDishes[0]}!`
    : '';
  
  return `${intro} **${restaurant.name}** in ${restaurant.location.area}.${featureText}.${dishHighlight}`;
}

export function generateNoResultsExplanation(query: ParsedQuery): string {
  let explanation = 'We couldn\'t find a perfect match for your specific craving, but don\'t worry! ';
  
  if (query.budgetHints.length > 0) {
    explanation += 'Try adjusting your budget range or ';
  }
  
  if (query.cuisinePreferences.length > 0) {
    explanation += 'consider exploring different cuisines. ';
  }
  
  explanation += 'Here are some close alternatives that might still satisfy your craving:';
  
  return explanation;
}
