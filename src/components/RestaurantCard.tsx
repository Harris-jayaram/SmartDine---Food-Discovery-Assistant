import React, { useState } from 'react';
import Image from 'next/image';
import { RecommendationResult } from '@/types/restaurant';

interface RestaurantCardProps {
  result: RecommendationResult;
  rank: number;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({ result, rank }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [imageError, setImageError] = useState(false);
  
  const { restaurant, explanation, matchedCriteria, score } = result;

  const getPriceRangeDisplay = (priceRange: string, avgCost: number) => {
    const symbols = {
      budget: '₹',
      'mid-range': '₹₹',
      premium: '₹₹₹'
    };
    return {
      symbol: symbols[priceRange as keyof typeof symbols] || '₹',
      text: `₹${avgCost} for two`
    };
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'bg-green-500';
    if (rating >= 4.0) return 'bg-green-400';
    if (rating >= 3.5) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const getSourceBadge = (source: string) => {
    return source === 'local' ? (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
        <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
        Curated
      </span>
    ) : (
      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
        <div className="w-2 h-2 bg-blue-500 rounded-full mr-1"></div>
        Live Data
      </span>
    );
  };

  const priceDisplay = getPriceRangeDisplay(restaurant.priceRange, restaurant.avgCostForTwo);

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">

      <div className="relative h-48 overflow-hidden">
        {!imageError ? (
          <Image
            src={restaurant.imageUrl}
            alt={restaurant.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">🍽️</div>
              <p className="text-gray-600 text-sm">{restaurant.cuisine[0]} Restaurant</p>
            </div>
          </div>
        )}
        

        <div className="absolute top-3 right-3">
          <div className={`${getRatingColor(restaurant.rating)} text-white px-2 py-1 rounded-full text-sm font-semibold flex items-center`}>
            ⭐ {restaurant.rating}
          </div>
        </div>


        <div className="absolute top-3 left-3">
          {getSourceBadge(restaurant.source)}
        </div>
      </div>


      <div className="p-6">

        <div className="mb-3">
          <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors duration-200">
            {restaurant.name}
          </h3>
          <p className="text-gray-600 text-sm flex items-center">
            📍 {restaurant.location.area} • {restaurant.location.distanceFromCampusKm}km from campus
          </p>
        </div>


        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-wrap gap-1">
            {restaurant.cuisine.slice(0, 2).map((cuisine, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                {cuisine}
              </span>
            ))}
            {restaurant.cuisine.length > 2 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs">
                +{restaurant.cuisine.length - 2}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-bold text-orange-600">{priceDisplay.symbol}</div>
            <div className="text-xs text-gray-500">{priceDisplay.text}</div>
          </div>
        </div>


        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2">Popular: 
            <span className="font-medium text-gray-800 ml-1">
              {restaurant.popularDishes.slice(0, 2).join(', ')}
            </span>
          </p>
        </div>

     =
        <div className="flex flex-wrap gap-1 mb-4">
          {restaurant.vibeTags.slice(0, 3).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-orange-50 text-orange-700 rounded-full text-xs border border-orange-200">
              {tag}
            </span>
          ))}
          {restaurant.vibeTags.length > 3 && (
            <span className="px-2 py-1 bg-gray-50 text-gray-600 rounded-full text-xs">
              +{restaurant.vibeTags.length - 3}
            </span>
          )}
        </div>

       
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-4 mb-4 border border-blue-100">
          <div className="flex items-start">
            <div className="text-lg mr-2">🤖</div>
            <div>
              <p className="text-sm text-gray-700 leading-relaxed">
                <span dangerouslySetInnerHTML={{ __html: explanation.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
              </p>
              {matchedCriteria.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-1">
                  {matchedCriteria.slice(0, 3).map((criteria, index) => (
                    <span key={index} className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                      ✓ {criteria}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

 
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-1">
            <span>Match Score</span>
            <span className="font-semibold">{Math.round(score * 100)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${score * 100}%` }}
            ></div>
          </div>
        </div>

        <button
          onClick={() => setShowDetails(!showDetails)}
          className="w-full text-center text-orange-600 hover:text-orange-700 font-medium text-sm py-2 border border-orange-200 rounded-lg hover:bg-orange-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300"
        >
          {showDetails ? 'Hide Details ↑' : 'View More Details ↓'}
        </button>

        {/* Expandable Details */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-3 animate-fadeIn">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Wait Time:</span>
                <span className="ml-2 font-medium text-black">{restaurant.approxWaitingTimeMinutes} min</span>
              </div>
              <div>
                <span className="text-gray-600">Open Late:</span>
                <span className="ml-2 font-medium text-black">{restaurant.isOpenLate ? '✅ Yes' : '❌ No'}</span>
              </div>
            </div>
            
            <div>
              <span className="text-gray-600 text-sm">Diet Options:</span>
              <div className="flex flex-wrap gap-1 mt-1">
                {restaurant.dietTags.map((tag, index) => (
                  <span key={index} className="px-2 py-1 bg-green-50 text-green-700 rounded-full text-xs border border-green-200">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <span className="text-gray-600 text-sm">Review:</span>
              <p className="text-sm text-gray-700 italic mt-1">"{restaurant.reviewSnippet}"</p>
            </div>

            <div>
              <span className="text-gray-600 text-sm">All Dishes:</span>
              <p className="text-sm text-gray-700 mt-1">{restaurant.popularDishes.join(', ')}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantCard;