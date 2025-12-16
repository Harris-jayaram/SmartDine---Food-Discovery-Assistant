import { NextRequest, NextResponse } from 'next/server';
import { GooglePlacesClient } from '@/lib/external/googlePlacesClient';
import { appConfig } from '@/lib/config';


export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('query');
    const limit = parseInt(searchParams.get('limit') || appConfig.maxExternalResults.toString());

    const googleClient = new GooglePlacesClient();

    if (!googleClient.isAvailable()) {
      return NextResponse.json(
        { 
          error: 'External API not available',
          message: 'Google Places API key not configured'
        },
        { status: 503 }
      );
    }

    let externalPlaces;
    
    if (query) {

      console.log(`Searching external restaurants for: ${query}`);
      externalPlaces = await googleClient.searchRestaurants(query);
    } else {

      console.log('Fetching nearby external restaurants');
      externalPlaces = await googleClient.fetchNearbyRestaurants();
    }


    const restaurants = externalPlaces
      .slice(0, limit)
      .map(place => googleClient.normalizeToRestaurant(place));

    const response = {
      restaurants,
      metadata: {
        total: restaurants.length,
        query: query || 'nearby',
        source: 'google_places',
        campusLocation: appConfig.campusLocation.name,
        searchRadius: appConfig.searchRadius
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error in /api/external-restaurants:', error);
    

    if (error instanceof Error) {
      if (error.message.includes('API key')) {
        return NextResponse.json(
          { 
            error: 'API configuration error',
            message: 'External restaurant service is not properly configured'
          },
          { status: 503 }
        );
      }
      
      if (error.message.includes('quota') || error.message.includes('limit')) {
        return NextResponse.json(
          { 
            error: 'API quota exceeded',
            message: 'External restaurant service is temporarily unavailable'
          },
          { status: 429 }
        );
      }
    }

    return NextResponse.json(
      { 
        error: 'External API error',
        message: 'Failed to fetch external restaurant data'
      },
      { status: 502 }
    );
  }
}