import React from 'react';
import RestaurantCard from './RestaurantCard';
import { RecommendationResult } from '@/types/restaurant';

interface RestaurantResultsProps {
  results: RecommendationResult[];
  isLoading: boolean;
  searchQuery: string;
}

const RestaurantResults: React.FC<RestaurantResultsProps> = ({ 
  results, 
  isLoading, 
  searchQuery 
}) => {
  if (isLoading) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <div className="inline-flex items-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-orange-500 border-t-transparent mr-3"></div>
              <h2 className="text-2xl font-bold text-gray-900">
                Finding perfect matches for you...
              </h2>
            </div>
            <p className="text-gray-600 mt-2">
              Analyzing your cravings and searching through local and external restaurants
            </p>
          </div>
          
          {/* Loading skeleton */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-200 rounded mb-3"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="flex gap-2 mb-4">
                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                    <div className="h-6 bg-gray-200 rounded-full w-20"></div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (results.length === 0) {
    return (
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-8">
            <div className="text-6xl mb-4">🤷‍♂️</div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              No perfect matches found
            </h2>
            <p className="text-gray-600 mb-6">
              We couldn't find restaurants that exactly match "{searchQuery}". 
              Try adjusting your search criteria or being more general.
            </p>
            <div className="text-sm text-gray-500">
              <p className="mb-2">Try these instead:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-white px-3 py-1 rounded-full border">"comfort food"</span>
                <span className="bg-white px-3 py-1 rounded-full border">"spicy food"</span>
                <span className="bg-white px-3 py-1 rounded-full border">"budget friendly"</span>
                <span className="bg-white px-3 py-1 rounded-full border">"quick bite"</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Perfect Matches for You! 🎯
          </h2>
          <p className="text-lg text-gray-600">
            Based on "{searchQuery}" - Here are {results.length} personalized recommendations
          </p>
        </div>

        {/* Results Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map((result, index) => (
            <div key={result.restaurant.id} className="relative">
              {/* Ranking badge */}
              <div className="absolute -top-3 -left-3 z-10">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-400' : 
                  index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
              </div>
              
              <RestaurantCard 
                result={result}
                rank={index + 1}
              />
            </div>
          ))}
        </div>

        {/* Results Footer */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <p className="text-gray-600 text-sm mb-4">
              Recommendations powered by AI analysis of your preferences, 
              combined with local curated data and live Google Places information.
            </p>
            <div className="flex justify-center items-center gap-4 text-xs text-gray-500">
              <span className="flex items-center">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
                Local Curated
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
                Google Places
              </span>
              <span className="flex items-center">
                <div className="w-2 h-2 bg-orange-500 rounded-full mr-1"></div>
                AI Matched
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RestaurantResults;