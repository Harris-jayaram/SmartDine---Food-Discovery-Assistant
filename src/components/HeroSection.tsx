import React from 'react';

interface HeroSectionProps {
  onStartChatting: () => void;
}

const HeroSection: React.FC<HeroSectionProps> = ({ onStartChatting }) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
    
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-4xl mx-auto text-center">
        

        <div className="mb-8 flex flex-col sm:flex-row items-center justify-center gap-3 ">
          
          <div className="">
             <img
               src="SmartDine (2).png"
               alt="SmartDine Logo"
               className="h-20 w-auto sm:h-25 object-contain"
             />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900">
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              SmartDine
            </span>
          </h1>
        </div>
        {/* ======================================= */}

        <div className="mb-8">
          <p className="text-xl sm:text-2xl text-gray-700 font-medium">
            Food Discovery Assistant
          </p>
        </div>

        {/* Tagline */}
        <div className="mb-12">
          <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Tell us your cravings. We'll handle the rest.
          </p>
        </div>

        {/* Problem & Solution Description */}
        <div className="mb-12 max-w-3xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤔</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">The Problem</h3>
              <p className="text-gray-600 text-sm">
                Endless scrolling through food apps, indecisive moments, and "what should we eat?" conversations
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🤖</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">AI-Powered</h3>
              <p className="text-gray-600 text-sm">
                Smart recommendations using natural language understanding and real-time data from Google Places
              </p>
            </div>
            
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-6 shadow-lg">
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Perfect Match</h3>
              <p className="text-gray-600 text-sm">
                Contextual recommendations with human-like explanations tailored to your mood and budget
              </p>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="mb-8">
          <button
            onClick={onStartChatting}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Start Chatting 🍽️
          </button>
        </div>

        {/* Quick examples */}
        <div className="text-sm text-gray-500">
          <p className="mb-2">Try saying:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <span className="bg-white/50 px-3 py-1 rounded-full">"something cheesy but not too expensive"</span>
            <span className="bg-white/50 px-3 py-1 rounded-full">"comfort food after a rough day"</span>
            <span className="bg-white/50 px-3 py-1 rounded-full">"spicy biryani under ₹300"</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;