# SmartDine - Food Discovery Assistant 🍽️

A production-ready web application that helps Indian college students and young professionals discover perfect restaurants using AI-powered conversational search and real-time data integration.

![SmartDine Demo](https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=400&fit=crop)

## 🌟 Features

### Core Functionality
- **Conversational Search**: Natural language query understanding (e.g., "something cheesy but not too expensive")
- **AI-Powered Recommendations**: Smart scoring algorithm with human-like explanations
- **Surprise Me Feature**: Random high-quality recommendations for indecisive users
- **Dual Data Sources**: Curated local database + live Google Places API integration
- **Responsive Design**: Optimized for mobile, tablet, and desktop

### Smart Matching
- **Mood Analysis**: Understands context like "comfort food after a rough day"
- **Budget Intelligence**: Processes price hints like "under ₹300" or "not too expensive"
- **Cuisine Preferences**: Matches specific food cravings and dietary requirements
- **Group Context**: Considers group size and occasion (date, friends, family)

## 🚀 Live Demo

Visit the live application: [SmartDine Demo](https://smartdine-ai.netlify.app/)

### Try These Example Queries:
- "comfort food homely"
- "spicy hot food"
- "cheap budget under 200"
- "quick fast food near campus"
- "group friends celebration"
- "late night open midnight"

## 🛠️ Technology Stack

- **Frontend**: Next.js 16, React 18, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Backend**: Next.js API Routes
- **External APIs**: Google Places API integration
- **Data**: Local curated dataset + live API data
- **Deployment**: Vercel-ready with standalone output

## 📁 Project Structure

```
smartdine/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── restaurants/   # Combined restaurant data
│   │   │   ├── external-restaurants/ # Google Places integration
│   │   │   └── search/        # Conversational search endpoint
│   │   ├── globals.css        # Global styles and animations
│   │   ├── layout.tsx         # Root layout
│   │   └── page.tsx           # Main page
│   ├── components/            # React components
│   │   ├── HeroSection.tsx    # Landing section
│   │   ├── SearchSection.tsx  # Search interface
│   │   ├── RestaurantResults.tsx # Results display
│   │   ├── RestaurantCard.tsx # Individual restaurant cards
│   │   └── AboutSection.tsx   # How it works section
│   ├── data/
│   │   └── restaurants.ts     # 20 curated local eateries
│   ├── lib/
│   │   ├── config.ts          # App configuration
│   │   └── googlePlaces.ts    # Google Places API client
│   ├── types/
│   │   └── restaurant.ts      # TypeScript interfaces
│   └── utils/                 # Utility functions
│       ├── parseQuery.ts      # NLP-like query parsing
│       ├── scoreRestaurants.ts # Recommendation scoring
│       └── generateExplanation.ts # AI explanations
├── .env.example               # Environment variables template
├── .env.local                 # Local environment variables
├── next.config.ts             # Next.js configuration
└── README.md                  # This file
```

## 🔧 Setup & Installation

### Prerequisites
- Node.js 20.9.0 or higher
- npm or yarn package manager
- Google Places API key (optional for full functionality)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd smartdine
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your Google Places API key:
   ```env
   GOOGLE_PLACES_API_KEY=your_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:3000`

### Getting Google Places API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable the "Places API (New)"
4. Create credentials (API Key)
5. Restrict the API key to your domain for security

## 🎯 Core Features Explained

### 1. Conversational Search Engine

The app uses a custom NLP-like engine that parses natural language queries:

```typescript
// Example query parsing
"comfort food after a rough day, not too expensive"
↓
{
  mood: ["comfort", "rough day"],
  budget: ["not too expensive"],
  adjectives: ["comfort"],
  groupContext: "individual"
}
```

### 2. Smart Scoring Algorithm

Restaurants are scored based on multiple criteria:
- **Mood matching**: vibeTags alignment
- **Budget compatibility**: priceRange and avgCostForTwo
- **Cuisine preferences**: cuisine and popularDishes matching
- **Location relevance**: distance from campus
- **Quality indicators**: rating and reviewSnippet

### 3. Dual Data Architecture

**Local Curated Dataset (20 restaurants)**:
- Rich metadata with vibe tags, popular dishes
- Student-focused reviews and pricing
- Instant availability, no API limits

**Google Places Integration**:
- Real-time restaurant data
- Live ratings and operating hours
- Broader restaurant coverage
- Graceful fallback when API unavailable

### 4. Responsive UI Components

- **Mobile-first design** with Tailwind CSS
- **Progressive enhancement** for larger screens
- **Accessible interactions** with proper ARIA labels
- **Smooth animations** and loading states

## 🔍 API Endpoints

### `/api/restaurants`
Returns combined restaurant data from local dataset and Google Places.

**Response:**
```json
{
  "restaurants": [
    {
      "id": "string",
      "name": "string",
      "cuisine": ["string"],
      "priceRange": "budget|mid-range|premium",
      "rating": 4.5,
      "location": {
        "area": "string",
        "distanceFromCampusKm": 1.5
      },
      "vibeTags": ["comfort food", "group friendly"],
      "source": "local|external"
    }
  ],
  "totalCount": 25,
  "sources": {
    "local": 20,
    "external": 5
  }
}
```

### `/api/search`
Conversational search endpoint with AI-powered recommendations.

**Request:**
```json
{
  "query": "comfort food after a rough day",
  "surpriseMe": false
}
```

**Response:**
```json
{
  "results": [
    {
      "restaurant": { /* Restaurant object */ },
      "explanation": "Try Grandma's Kitchen because...",
      "matchedCriteria": ["comfort food", "budget friendly"],
      "score": 0.95
    }
  ],
  "query": "comfort food after a rough day",
  "totalMatches": 3
}
```

## 🎨 Customization

### Adding New Restaurants

Edit `src/data/restaurants.ts` to add more local eateries:

```typescript
{
  id: "new-restaurant",
  name: "New Restaurant",
  cuisine: ["Indian", "Fast Food"],
  priceRange: "budget",
  avgCostForTwo: 200,
  location: {
    area: "Campus Area",
    distanceFromCampusKm: 0.5
  },
  rating: 4.2,
  popularDishes: ["Special Dish", "Popular Item"],
  vibeTags: ["quick bite", "student friendly"],
  dietTags: ["veg", "non-veg"],
  isOpenLate: true,
  shortDescription: "Description here",
  reviewSnippet: "Student review here",
  approxWaitingTimeMinutes: 10,
  imageUrl: "https://images.unsplash.com/photo-...",
  source: "local"
}
```

### Customizing Search Logic

Modify `src/utils/parseQuery.ts` to add new keyword mappings:

```typescript
const MOOD_KEYWORDS = {
  comfort: ['comfort', 'homely', 'cozy'],
  celebration: ['party', 'celebrate', 'special'],
  // Add your keywords here
};
```

### Styling Customization

The app uses Tailwind CSS. Key color scheme:
- Primary: Orange (500-600)
- Secondary: Red (500-600)
- Accent: Purple (500), Blue (500)
- Neutral: Gray (50-900)

## 🚀 Deployment

### Vercel (Recommended)

1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Manual Deployment

```bash
npm run build
npm start
```

### Docker Deployment

```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 🧪 Testing

### Manual Testing Checklist

- [x] Search with natural language queries
- [x] Test "Surprise Me" functionality
- [x] Verify responsive design on mobile/tablet
- [x] Check API fallback when Google Places unavailable
- [x] Test expandable restaurant details
- [x] Verify accessibility with keyboard navigation

### Example Test Queries

1. **Budget queries**: "cheap food under 150", "budget friendly"
2. **Mood queries**: "comfort food", "celebration dinner", "quick bite"
3. **Cuisine queries**: "spicy biryani", "south indian breakfast"
4. **Group queries**: "date spot", "friends hangout", "family dinner"
5. **Time queries**: "late night food", "quick lunch"
