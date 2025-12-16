'use client';

import { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import SearchSection from '@/components/SearchSection';
import RestaurantResults from '@/components/RestaurantResults';
import AboutSection from '@/components/AboutSection';
import { RecommendationResult } from '@/types/restaurant';

export default function Home() {
  const [searchResults, setSearchResults] = useState<RecommendationResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = async (query: string, surpriseMe = false) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      const response = await fetch('/api/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          query, 
          surpriseMe,
          includeExternal: true 
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setSearchResults(data.results || []);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section');
    searchSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
    
      <HeroSection onStartChatting={scrollToSearch} />
      
      <SearchSection 
        onSearch={handleSearch}
        isLoading={isLoading}
      />
      
      {(searchResults.length > 0 || isLoading) && (
        <RestaurantResults 
          results={searchResults}
          isLoading={isLoading}
          searchQuery={searchQuery}
        />
      )}

      <AboutSection />
    </div>
  );
}
