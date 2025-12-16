import { NextRequest, NextResponse } from 'next/server';
import { localRestaurants } from '@/data/restaurants';
import { GooglePlacesClient } from '@/lib/external/googlePlacesClient';
import { parseQuery } from '@/utils/parseQuery';
import { scoreRestaurants } from '@/utils/scoreRestaurants';
import { generateSurpriseExplanation, generateNoResultsExplanation } from '@/utils/generateExplanation';
import { GooglePlacesResult, Restaurant } from '@/types/restaurant';
import { appConfig, SEARCH_CONFIG } from '@/lib/config';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query, includeExternal = true, surpriseMe = false } = body;

    if (!query && !surpriseMe) {
      return NextResponse.json(
        { error: 'Query is required' },
        { status: 400 }
      );
    }

    let allRestaurants: Restaurant[] = [...localRestaurants];

    if (includeExternal) {
      try {
        const googleClient = new GooglePlacesClient();
        
        if (googleClient.isAvailable()) {
          let externalPlaces: GooglePlacesResult[];
          
          if (query && query.trim() !== 'surprise me') {
            console.log(`Searching external restaurants for: ${query}`);
            externalPlaces = await googleClient.searchRestaurants(query);
          } else {
            console.log('Fetching nearby external restaurants');
            externalPlaces = await googleClient.fetchNearbyRestaurants();
          }
          
          const externalRestaurants = externalPlaces
            .slice(0, appConfig.maxExternalResults)
            .map(place => googleClient.normalizeToRestaurant(place));
          
          allRestaurants = [...allRestaurants, ...externalRestaurants];
        }
      } catch (error) {
        console.error('Error fetching external restaurants for search:', error);
      }
    }

    if (surpriseMe) {
      const eligibleRestaurants = allRestaurants.filter(r => 
        r.rating >= SEARCH_CONFIG.SURPRISE_ME_MIN_RATING &&
        r.priceRange !== 'premium'
      );

      if (eligibleRestaurants.length === 0) {
        return NextResponse.json({
          results: [],
          metadata: {
            query: 'surprise me',
            totalResults: 0,
            searchType: 'surprise',
            message: 'No suitable restaurants found for surprise selection'
          }
        });
      }

      const randomRestaurant = eligibleRestaurants[
        Math.floor(Math.random() * eligibleRestaurants.length)
      ];

      const surpriseResult = {
        restaurant: randomRestaurant,
        score: 1.0,
        explanation: generateSurpriseExplanation(randomRestaurant),
        matchedCriteria: ['surprise selection', 'highly rated']
      };

      return NextResponse.json({
        results: [surpriseResult],
        metadata: {
          query: 'surprise me',
          totalResults: 1,
          searchType: 'surprise',
          restaurantPool: eligibleRestaurants.length
        }
      });
    }

    const parsedQuery = parseQuery(query);
    
    const recommendations = scoreRestaurants(allRestaurants, parsedQuery);

    if (recommendations.length === 0) {
      const alternatives = allRestaurants
        .filter(r => r.rating >= 3.5)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3)
        .map(restaurant => ({
          restaurant,
          score: 0.5,
          explanation: `While not a perfect match, ${restaurant.name} is highly rated and might still satisfy your craving.`,
          matchedCriteria: ['alternative suggestion', 'highly rated']
        }));

      return NextResponse.json({
        results: alternatives,
        metadata: {
          query,
          parsedQuery,
          totalResults: alternatives.length,
          searchType: 'alternatives',
          message: generateNoResultsExplanation(parsedQuery)
        }
      });
    }

    return NextResponse.json({
      results: recommendations,
      metadata: {
        query,
        parsedQuery,
        totalResults: recommendations.length,
        searchType: 'conversational',
        restaurantPool: allRestaurants.length,
        localCount: localRestaurants.length,
        externalCount: allRestaurants.length - localRestaurants.length
      }
    });

  } catch (error) {
    console.error('Error in /api/search:', error);
    return NextResponse.json(
      { 
        error: 'Search failed',
        message: 'Unable to process your search request'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  if (type === 'suggestions') {
    const suggestions = [
      'something cheesy but not too expensive',
      'spicy North Indian for a group of friends',
      'comfort food after a rough day',
      'good biryani near campus under ₹300',
      'quick bite between classes',
      'healthy salad for lunch',
      'late night snacks',
      'romantic dinner spot',
      'unlimited thali meal',
      'fresh juice and smoothies'
    ];

    return NextResponse.json({
      suggestions,
      categories: [
        { name: 'Comfort Food', query: 'comfort food homely' },
        { name: 'Spicy Night', query: 'spicy hot food' },
        { name: 'Under ₹200', query: 'cheap budget under 200' },
        { name: 'Quick Bite', query: 'quick fast food near campus' },
        { name: 'Group Hangout', query: 'group friends celebration' },
        { name: 'Late Night', query: 'late night open midnight' }
      ]
    });
  }

  return NextResponse.json({
    message: 'Use POST /api/search with a query to search for restaurants'
  });
}
