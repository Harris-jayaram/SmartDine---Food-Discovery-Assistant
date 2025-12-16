import React from 'react';

const AboutSection: React.FC = () => {
  return (
    <section className="relative py-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/bg3.jpg"
          alt="Restaurant ambiance"
          className="w-full h-full "
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-gray-50/90 to-white/95 backdrop-blur-[1px]"></div>
      </div>
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            How SmartDine Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Powered by AI and real-time data to solve your food decision problems
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl text-white font-bold">1</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Tell Us Your Cravings</h3>
            <p className="text-gray-600">
              Describe your mood, budget, cuisine preference, or any specific craving in natural language. 
              Our AI understands context like "comfort food after a rough day" or "spicy but not too expensive."
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl text-white font-bold">2</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">AI Analysis & Matching</h3>
            <p className="text-gray-600">
              Our recommendation engine analyzes your query against our curated local database and 
              live Google Places data, scoring restaurants based on mood, cuisine, budget, and location.
            </p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
              <span className="text-2xl text-white font-bold">3</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-3">Get Perfect Recommendations</h3>
            <p className="text-gray-600">
              Receive personalized recommendations with human-like explanations of why each restaurant 
              matches your specific craving, complete with ratings, prices, and popular dishes.
            </p>
          </div>
        </div>
        <div className="bg-white/95 rounded-2xl shadow-lg p-8 mb-12 backdrop-blur-sm border border-gray-100">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Data Sources</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">🏪</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Curated Local Database</h4>
                <p className="text-gray-600 text-sm">
                  20+ handpicked local eateries with rich metadata including vibe tags, popular dishes, 
                  student reviews, and detailed pricing information. Perfect for discovering hidden gems 
                  and student favorites around campus.
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-2xl">🌐</span>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Google Places API</h4>
                <p className="text-gray-600 text-sm">
                  Live integration with Google Places API provides real-time data on nearby restaurants, 
                  ratings, price levels, and operating hours. Ensures you always have access to the 
                  latest information and new restaurant discoveries.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white/90 rounded-xl p-6 shadow-md text-center backdrop-blur-sm border border-gray-50">
            <div className="text-3xl mb-3">🧠</div>
            <h4 className="font-semibold text-gray-900 mb-2">Smart NLP</h4>
            <p className="text-gray-600 text-sm">
              Understands natural language queries and context
            </p>
          </div>
          <div className="bg-white/90 rounded-xl p-6 shadow-md text-center backdrop-blur-sm border border-gray-50">
            <div className="text-3xl mb-3">⚡</div>
            <h4 className="font-semibold text-gray-900 mb-2">Real-time Data</h4>
            <p className="text-gray-600 text-sm">
              Live restaurant information from Google Places
            </p>
          </div>
          <div className="bg-white/90 rounded-xl p-6 shadow-md text-center backdrop-blur-sm border border-gray-50">
            <div className="text-3xl mb-3">🎯</div>
            <h4 className="font-semibold text-gray-900 mb-2">Contextual Matching</h4>
            <p className="text-gray-600 text-sm">
              Considers mood, budget, group size, and preferences
            </p>
          </div>
          <div className="bg-white/90 rounded-xl p-6 shadow-md text-center backdrop-blur-sm border border-gray-50">
            <div className="text-3xl mb-3">💬</div>
            <h4 className="font-semibold text-gray-900 mb-2">Human Explanations</h4>
            <p className="text-gray-600 text-sm">
              Clear reasons why each restaurant matches your craving
            </p>
          </div>
        </div>
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white shadow-xl">
          <h3 className="text-2xl font-bold mb-6 text-center">Built for Students, By Students</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-orange-300">Technology Stack</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• Next.js 14 with TypeScript for type-safe development</li>
                <li>• Tailwind CSS for responsive, modern UI design</li>
                <li>• Google Places API for real-time restaurant data</li>
                <li>• Custom NLP engine for query understanding</li>
                <li>• Intelligent scoring algorithm for recommendations</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-orange-300">Perfect For</h4>
              <ul className="space-y-2 text-gray-300 text-sm">
                <li>• College students exploring local food options</li>
                <li>• Young professionals new to the area</li>
                <li>• Anyone tired of endless food app scrolling</li>
                <li>• Groups struggling with "where should we eat?" decisions</li>
                <li>• Food enthusiasts seeking personalized recommendations</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-800 font-medium mb-6">
            Ready to solve your food decision problems? Start chatting with SmartDine!
          </p>
          <button
            onClick={() => {
              const searchSection = document.getElementById('search-section');
              searchSection?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-orange-300"
          >
            Try SmartDine Now 🚀
          </button>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
