import React, { useState, useEffect } from 'react';

interface SearchSectionProps {
  onSearch: (query: string, surpriseMe?: boolean) => void;
  isLoading: boolean;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);

  useEffect(() => {
    const loadSuggestions = async () => {
      try {
        const response = await fetch('/api/search?type=suggestions');
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      } catch (error) {
        console.error('Failed to load suggestions:', error);
      }
    };

    loadSuggestions();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    onSearch(suggestion);
  };

  const handleSurpriseMe = () => {
    onSearch('surprise me', true);
  };

  const quickSuggestions = [
    { label: 'Comfort Food', query: 'comfort food homely' },
    { label: 'Spicy Night', query: 'spicy hot food' },
    { label: 'Under ₹200', query: 'cheap budget under 200' },
    { label: 'Quick Bite', query: 'quick fast food near campus' },
    { label: 'Group Hangout', query: 'group friends celebration' },
    { label: 'Late Night', query: 'late night open midnight' }
  ];

  return (
    <section id="search-section" className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-[600px] flex items-center">
      <div className="absolute inset-0 z-0">
        <img
          src="/bg1.jpg"
          alt="Delicious food background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/85 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-4xl mx-auto w-full">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            What are you craving?
          </h2>
          <p className="text-lg text-gray-700 font-medium max-w-2xl mx-auto">
            Describe your mood, budget, or specific cravings in natural language. 
            Our AI will find the perfect match for you.
          </p>
        </div>

        <div className="mb-8">
          <form onSubmit={handleSubmit} className="relative">
            <div className="relative group">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Example: something cheesy but not too expensive..."
                className="w-full px-6 py-4 text-black border-2 border-gray-200 rounded-2xl shadow-lg focus:border-orange-500 focus:outline-none focus:ring-4 focus:ring-orange-100 transition-all duration-200 pr-32 bg-white/95"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="absolute right-2 top-2 bottom-2 px-6 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300 shadow-md"
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                    Searching...
                  </div>
                ) : (
                  'Search 🔍'
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="mb-8">
          <p className="text-sm text-gray-700 font-semibold mb-4 text-center">Quick suggestions:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {quickSuggestions.map((suggestion, index) => (
              <button
                key={index}
                onClick={() => handleSuggestionClick(suggestion.query)}
                disabled={isLoading}
                className="px-4 py-2 bg-white/90 border border-gray-200 rounded-full text-sm text-gray-700 hover:bg-orange-50 hover:border-orange-300 hover:text-orange-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-300 shadow-sm"
              >
                {suggestion.label}
              </button>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="inline-block bg-white/60 backdrop-blur-md rounded-2xl p-8 border border-white/50 shadow-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Feeling Indecisive? 🎲
            </h3>
            <p className="text-gray-700 mb-6 max-w-md mx-auto">
              Let our AI surprise you with a highly-rated restaurant that matches your typical preferences!
            </p>
            <button
              onClick={handleSurpriseMe}
              disabled={isLoading}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-4 focus:ring-purple-300"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Surprising...
                </div>
              ) : (
                'Surprise Me! ✨'
              )}
            </button>
          </div>
        </div>

        <div className="mt-12 text-center">
          <details className="group">
            <summary className="cursor-pointer text-gray-700 font-medium hover:text-gray-900 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-300 rounded bg-white/40 inline-block px-4 py-1 rounded-full">
              <span className="text-sm">See more example queries ↓</span>
            </summary>
            <div className="mt-4 grid sm:grid-cols-2 gap-2 text-sm text-gray-700 bg-white/60 p-4 rounded-xl backdrop-blur-sm">
              {suggestions.slice(0, 8).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  disabled={isLoading}
                  className="text-left p-2 rounded hover:bg-white/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-300"
                >
                  "{suggestion}"
                </button>
              ))}
            </div>
          </details>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
