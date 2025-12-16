import { NextRequest, NextResponse } from 'next/server';
import { localRestaurants } from '@/data/restaurants';
import { GooglePlacesClient } from '@/lib/external/googlePlacesClient';
import { Restaurant } from '@/types/restaurant';
import { appConfig } from '@/lib/config';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const includeExternal = searchParams.get('external') !== 'false';
    const limit = parseInt(searchParams.get('limit') || '20');

    let allRestaurants: Restaurant[] = [...localRestaurants];

    
    if (includeExternal) {
      try {
        const googleClient = new GooglePlacesClient();
        
        if (googleClient.isAvailable()) {
          console.log('Fetching external restaurants from Google Places API...');
          const externalPlaces = await googleClient.fetchNearbyRestaurants();
          
          const externalRestaurants = externalPlaces
            .slice(0, appConfig.maxExternalResults)
            .map(place => googleClient.normalizeToRestaurant(place));
          
          allRestaurants = [...allRestaurants, ...externalRestaurants];
          console.log(`Added ${externalRestaurants.length} external restaurants`);
        } else {
          console.log('Google Places API not available, using local data only');
        }
      } catch (error) {
        console.error('Error fetching external restaurants:', error);
      
        if (appConfig.fallbackToLocalOnly) {
          console.log('Falling back to local restaurants only');
        } else {
          return NextResponse.json(
            { 
              error: 'Failed to fetch external restaurant data',
              message: 'External API unavailable, try again later'
            },
            { status: 503 }
          );
        }
      }
    }

  
    const limitedRestaurants = allRestaurants.slice(0, limit);


    const response = {
      restaurants: limitedRestaurants,
      metadata: {
        total: limitedRestaurants.length,
        localCount: localRestaurants.length,
        externalCount: limitedRestaurants.length - localRestaurants.length,
        hasExternalData: limitedRestaurants.some(r => r.source === 'external'),
        campusLocation: appConfig.campusLocation.name
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in /api/restaurants:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        message: 'Failed to fetch restaurant data'
      },
      { status: 500 }
    );
  }
}


export async function POST(request: NextRequest) {
  return NextResponse.json(
    { 
      error: 'Method not implemented',
      message: 'Adding restaurants is not yet supported'
    },
    { status: 501 }
  );
}