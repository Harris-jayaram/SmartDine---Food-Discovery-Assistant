import { Restaurant } from '@/types/restaurant';

// Curated local restaurant dataset for Indian college town (Coimbatore-style)
export const localRestaurants: Restaurant[] = [
  {
    id: "local-1",
    name: "Annapoorna Mess",
    cuisine: ["South Indian", "Traditional"],
    priceRange: "budget",
    avgCostForTwo: 120,
    location: {
      area: "Peelamedu",
      distanceFromCampusKm: 0.8,
    },
    rating: 4.2,
    popularDishes: ["Unlimited Thali", "Sambar Rice", "Rasam", "Curd Rice"],
    vibeTags: ["comfort food", "homely", "unlimited meals", "student favorite"],
    dietTags: ["veg", "traditional"],
    isOpenLate: false,
    shortDescription: "Authentic South Indian mess serving unlimited traditional meals",
    reviewSnippet: "Best unlimited thali in town! Feels like home-cooked food.",
    approxWaitingTimeMinutes: 10,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    source: "local"
  },
  {
    id: "local-2",
    name: "Sharma's Dhaba",
    cuisine: ["North Indian", "Punjabi"],
    priceRange: "budget",
    avgCostForTwo: 180,
    location: {
      area: "Gandhipuram",
      distanceFromCampusKm: 2.1,
    },
    rating: 4.0,
    popularDishes: ["Butter Chicken", "Dal Makhani", "Naan", "Lassi"],
    vibeTags: ["comfort food", "group friendly", "authentic", "filling"],
    dietTags: ["non-veg", "veg options"],
    isOpenLate: true,
    shortDescription: "Roadside dhaba serving hearty North Indian comfort food",
    reviewSnippet: "Generous portions and authentic flavors. Perfect after a long day!",
    approxWaitingTimeMinutes: 15,
    imageUrl: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400",
    source: "local"
  },
  {
    id: "local-3",
    name: "Cafe Mocha",
    cuisine: ["Continental", "Italian", "Cafe"],
    priceRange: "mid-range",
    avgCostForTwo: 350,
    location: {
      area: "RS Puram",
      distanceFromCampusKm: 3.2,
    },
    rating: 4.4,
    popularDishes: ["Pasta Arrabiata", "Chicken Sandwich", "Cold Coffee", "Brownie"],
    vibeTags: ["date spot", "cozy", "wifi", "study friendly", "instagram worthy"],
    dietTags: ["veg", "non-veg", "vegan options"],
    isOpenLate: true,
    shortDescription: "Trendy cafe with great coffee, pasta, and cozy ambiance",
    reviewSnippet: "Perfect for dates and study sessions. Great coffee and vibes!",
    approxWaitingTimeMinutes: 20,
    imageUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    source: "local"
  },
  {
    id: "local-4",
    name: "Biryani Paradise",
    cuisine: ["Hyderabadi", "Biryani", "Mughlai"],
    priceRange: "mid-range",
    avgCostForTwo: 280,
    location: {
      area: "Saibaba Colony",
      distanceFromCampusKm: 1.5,
    },
    rating: 4.6,
    popularDishes: ["Chicken Biryani", "Mutton Biryani", "Raita", "Shorba"],
    vibeTags: ["group friendly", "celebration", "aromatic", "authentic"],
    dietTags: ["non-veg", "halal"],
    isOpenLate: false,
    shortDescription: "Authentic Hyderabadi biryani with perfect spices and tender meat",
    reviewSnippet: "The best biryani in town! Each grain of rice is perfectly cooked.",
    approxWaitingTimeMinutes: 25,
    imageUrl: "https://images.unsplash.com/photo-1563379091339-03246963d51a?w=400",
    source: "local"
  },
  {
    id: "local-5",
    name: "Chai Point Express",
    cuisine: ["Snacks", "Tea", "Street Food"],
    priceRange: "budget",
    avgCostForTwo: 80,
    location: {
      area: "Peelamedu",
      distanceFromCampusKm: 0.5,
    },
    rating: 4.1,
    popularDishes: ["Masala Chai", "Samosa", "Vada Pav", "Bun Maska"],
    vibeTags: ["quick bite", "budget friendly", "late night", "street food"],
    dietTags: ["veg", "jain options"],
    isOpenLate: true,
    shortDescription: "24/7 tea stall with fresh snacks and the best masala chai",
    reviewSnippet: "Perfect for late-night cravings. Chai tastes like home!",
    approxWaitingTimeMinutes: 5,
    imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400",
    source: "local"
  },
  {
    id: "local-6",
    name: "Pizza Corner",
    cuisine: ["Italian", "Pizza", "Fast Food"],
    priceRange: "mid-range",
    avgCostForTwo: 320,
    location: {
      area: "Gandhipuram",
      distanceFromCampusKm: 2.0,
    },
    rating: 4.3,
    popularDishes: ["Margherita Pizza", "Chicken BBQ Pizza", "Garlic Bread", "Coke"],
    vibeTags: ["group friendly", "party", "cheesy", "comfort food"],
    dietTags: ["veg", "non-veg"],
    isOpenLate: true,
    shortDescription: "Wood-fired pizzas with fresh toppings and gooey cheese",
    reviewSnippet: "Crispy base, generous toppings. Great for group hangouts!",
    approxWaitingTimeMinutes: 18,
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
    source: "local"
  },
  {
    id: "local-7",
    name: "Dosa King",
    cuisine: ["South Indian", "Dosa", "Breakfast"],
    priceRange: "budget",
    avgCostForTwo: 140,
    location: {
      area: "Singanallur",
      distanceFromCampusKm: 1.8,
    },
    rating: 4.5,
    popularDishes: ["Masala Dosa", "Rava Dosa", "Filter Coffee", "Coconut Chutney"],
    vibeTags: ["breakfast", "crispy", "traditional", "quick bite"],
    dietTags: ["veg", "south indian"],
    isOpenLate: false,
    shortDescription: "Crispy dosas and authentic filter coffee since 1985",
    reviewSnippet: "Huge dosas with perfect crispiness. The filter coffee is divine!",
    approxWaitingTimeMinutes: 12,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400",
    source: "local"
  },
  {
    id: "local-8",
    name: "Spice Route",
    cuisine: ["Multi-cuisine", "Indian", "Chinese"],
    priceRange: "mid-range",
    avgCostForTwo: 380,
    location: {
      area: "RS Puram",
      distanceFromCampusKm: 3.0,
    },
    rating: 4.2,
    popularDishes: ["Chicken Manchurian", "Paneer Butter Masala", "Fried Rice", "Kulcha"],
    vibeTags: ["family friendly", "variety", "air conditioned", "comfortable"],
    dietTags: ["veg", "non-veg", "jain options"],
    isOpenLate: false,
    shortDescription: "Multi-cuisine restaurant with Indian and Chinese favorites",
    reviewSnippet: "Great variety and consistent taste. AC dining is a plus!",
    approxWaitingTimeMinutes: 22,
    imageUrl: "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=400",
    source: "local"
  },
  {
    id: "local-9",
    name: "Midnight Munchies",
    cuisine: ["Street Food", "Snacks", "Chaat"],
    priceRange: "budget",
    avgCostForTwo: 100,
    location: {
      area: "Peelamedu",
      distanceFromCampusKm: 0.7,
    },
    rating: 4.0,
    popularDishes: ["Pani Puri", "Bhel Puri", "Pav Bhaji", "Masala Puri"],
    vibeTags: ["late night", "street food", "spicy", "tangy", "budget friendly"],
    dietTags: ["veg", "street food"],
    isOpenLate: true,
    shortDescription: "Late-night street food joint for all your chaat cravings",
    reviewSnippet: "Perfect for midnight hunger pangs. Spicy and delicious!",
    approxWaitingTimeMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400",
    source: "local"
  },
  {
    id: "local-10",
    name: "The Burger Lab",
    cuisine: ["American", "Burgers", "Fast Food"],
    priceRange: "mid-range",
    avgCostForTwo: 300,
    location: {
      area: "Saibaba Colony",
      distanceFromCampusKm: 1.6,
    },
    rating: 4.4,
    popularDishes: ["Classic Beef Burger", "Chicken Zinger", "Loaded Fries", "Milkshake"],
    vibeTags: ["trendy", "instagram worthy", "juicy", "comfort food"],
    dietTags: ["non-veg", "veg options"],
    isOpenLate: true,
    shortDescription: "Gourmet burgers with fresh ingredients and creative combinations",
    reviewSnippet: "Juicy patties and crispy fries. Instagram-worthy presentation!",
    approxWaitingTimeMinutes: 15,
    imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
    source: "local"
  },
  {
    id: "local-11",
    name: "Grandma's Kitchen",
    cuisine: ["Home Style", "Comfort Food", "Traditional"],
    priceRange: "budget",
    avgCostForTwo: 160,
    location: {
      area: "Gandhipuram",
      distanceFromCampusKm: 2.2,
    },
    rating: 4.7,
    popularDishes: ["Home Style Curry", "Chapati", "Dal Tadka", "Pickle"],
    vibeTags: ["homely", "comfort food", "nostalgic", "healthy"],
    dietTags: ["veg", "home cooked"],
    isOpenLate: false,
    shortDescription: "Home-style cooking that reminds you of mom's food",
    reviewSnippet: "Tastes exactly like home food. Perfect when you miss family!",
    approxWaitingTimeMinutes: 12,
    imageUrl: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400",
    source: "local"
  },
  {
    id: "local-12",
    name: "Noodle House",
    cuisine: ["Chinese", "Thai", "Asian"],
    priceRange: "mid-range",
    avgCostForTwo: 250,
    location: {
      area: "RS Puram",
      distanceFromCampusKm: 2.8,
    },
    rating: 4.1,
    popularDishes: ["Hakka Noodles", "Pad Thai", "Spring Rolls", "Hot & Sour Soup"],
    vibeTags: ["slurpy", "comfort food", "group friendly", "flavorful"],
    dietTags: ["veg", "non-veg", "vegan options"],
    isOpenLate: true,
    shortDescription: "Authentic Asian noodles and stir-fries with bold flavors",
    reviewSnippet: "Perfect noodle texture and authentic Asian flavors!",
    approxWaitingTimeMinutes: 16,
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    source: "local"
  },
  {
    id: "local-13",
    name: "Ice Cream Junction",
    cuisine: ["Desserts", "Ice Cream", "Sweets"],
    priceRange: "budget",
    avgCostForTwo: 120,
    location: {
      area: "Peelamedu",
      distanceFromCampusKm: 1.0,
    },
    rating: 4.3,
    popularDishes: ["Kulfi", "Chocolate Sundae", "Fruit Salad", "Falooda"],
    vibeTags: ["sweet tooth", "cooling", "date spot", "celebration"],
    dietTags: ["veg", "sweet"],
    isOpenLate: true,
    shortDescription: "Wide variety of ice creams and traditional Indian desserts",
    reviewSnippet: "Perfect for beating the heat. Kulfi is absolutely divine!",
    approxWaitingTimeMinutes: 5,
    imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
    source: "local"
  },
  {
    id: "local-14",
    name: "Tiffin Center",
    cuisine: ["South Indian", "Breakfast", "Snacks"],
    priceRange: "budget",
    avgCostForTwo: 90,
    location: {
      area: "Singanallur",
      distanceFromCampusKm: 1.9,
    },
    rating: 4.0,
    popularDishes: ["Idli Sambar", "Vada", "Upma", "Pongal"],
    vibeTags: ["breakfast", "healthy", "light", "traditional"],
    dietTags: ["veg", "south indian", "healthy"],
    isOpenLate: false,
    shortDescription: "Traditional South Indian breakfast items and light snacks",
    reviewSnippet: "Soft idlis and flavorful sambar. Great for a light meal!",
    approxWaitingTimeMinutes: 8,
    imageUrl: "https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400",
    source: "local"
  },
  {
    id: "local-15",
    name: "Kebab Corner",
    cuisine: ["Mughlai", "Kebabs", "Grilled"],
    priceRange: "mid-range",
    avgCostForTwo: 320,
    location: {
      area: "Gandhipuram",
      distanceFromCampusKm: 2.3,
    },
    rating: 4.5,
    popularDishes: ["Chicken Tikka", "Seekh Kebab", "Tandoori Roti", "Mint Chutney"],
    vibeTags: ["smoky", "grilled", "protein rich", "celebration"],
    dietTags: ["non-veg", "halal"],
    isOpenLate: false,
    shortDescription: "Perfectly grilled kebabs with authentic spices and marinades",
    reviewSnippet: "Smoky flavors and tender meat. Best kebabs in the area!",
    approxWaitingTimeMinutes: 20,
    imageUrl: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=400",
    source: "local"
  },
  {
    id: "local-16",
    name: "Healthy Bites",
    cuisine: ["Healthy", "Salads", "Smoothies"],
    priceRange: "mid-range",
    avgCostForTwo: 280,
    location: {
      area: "RS Puram",
      distanceFromCampusKm: 3.1,
    },
    rating: 4.2,
    popularDishes: ["Greek Salad", "Protein Bowl", "Green Smoothie", "Quinoa Salad"],
    vibeTags: ["healthy", "fresh", "diet friendly", "clean eating"],
    dietTags: ["veg", "vegan", "gluten free", "keto"],
    isOpenLate: false,
    shortDescription: "Fresh salads, smoothie bowls, and healthy meal options",
    reviewSnippet: "Fresh ingredients and great for maintaining a healthy diet!",
    approxWaitingTimeMinutes: 10,
    imageUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400",
    source: "local"
  },
  {
    id: "local-17",
    name: "Paratha Palace",
    cuisine: ["North Indian", "Parathas", "Breakfast"],
    priceRange: "budget",
    avgCostForTwo: 150,
    location: {
      area: "Saibaba Colony",
      distanceFromCampusKm: 1.7,
    },
    rating: 4.3,
    popularDishes: ["Aloo Paratha", "Paneer Paratha", "Curd", "Pickle"],
    vibeTags: ["filling", "comfort food", "breakfast", "traditional"],
    dietTags: ["veg", "north indian"],
    isOpenLate: false,
    shortDescription: "Stuffed parathas with fresh butter and homemade curd",
    reviewSnippet: "Crispy parathas with generous stuffing. Very filling!",
    approxWaitingTimeMinutes: 12,
    imageUrl: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400",
    source: "local"
  },
  {
    id: "local-18",
    name: "Juice Junction",
    cuisine: ["Beverages", "Juices", "Smoothies"],
    priceRange: "budget",
    avgCostForTwo: 80,
    location: {
      area: "Peelamedu",
      distanceFromCampusKm: 0.6,
    },
    rating: 4.1,
    popularDishes: ["Fresh Orange Juice", "Watermelon Juice", "Mixed Fruit Smoothie", "Sugarcane Juice"],
    vibeTags: ["refreshing", "healthy", "cooling", "quick bite"],
    dietTags: ["veg", "fresh", "natural"],
    isOpenLate: true,
    shortDescription: "Fresh fruit juices and smoothies made to order",
    reviewSnippet: "Super fresh and no artificial flavors. Perfect for hot days!",
    approxWaitingTimeMinutes: 3,
    imageUrl: "https://images.unsplash.com/photo-1622597467836-f3285f2131b8?w=400",
    source: "local"
  },
  {
    id: "local-19",
    name: "Ramen Bowl",
    cuisine: ["Japanese", "Ramen", "Asian"],
    priceRange: "mid-range",
    avgCostForTwo: 350,
    location: {
      area: "RS Puram",
      distanceFromCampusKm: 2.9,
    },
    rating: 4.4,
    popularDishes: ["Chicken Ramen", "Vegetable Ramen", "Gyoza", "Miso Soup"],
    vibeTags: ["trendy", "warming", "comfort food", "instagram worthy"],
    dietTags: ["veg", "non-veg"],
    isOpenLate: true,
    shortDescription: "Authentic Japanese ramen with rich broth and fresh noodles",
    reviewSnippet: "Rich, flavorful broth and perfect noodle texture. Very trendy!",
    approxWaitingTimeMinutes: 18,
    imageUrl: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400",
    source: "local"
  },
  {
    id: "local-20",
    name: "Sweet Dreams Bakery",
    cuisine: ["Bakery", "Desserts", "Cakes"],
    priceRange: "mid-range",
    avgCostForTwo: 200,
    location: {
      area: "Gandhipuram",
      distanceFromCampusKm: 2.1,
    },
    rating: 4.6,
    popularDishes: ["Chocolate Cake", "Croissant", "Muffins", "Fresh Bread"],
    vibeTags: ["sweet tooth", "celebration", "fresh baked", "cozy"],
    dietTags: ["veg", "eggless options"],
    isOpenLate: false,
    shortDescription: "Fresh baked goods, cakes, and pastries made daily",
    reviewSnippet: "Freshly baked items every day. Perfect for celebrations!",
    approxWaitingTimeMinutes: 5,
    imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
    source: "local"
  }
];

// Helper function to get restaurants by criteria
export const getRestaurantsByPriceRange = (priceRange: Restaurant['priceRange']) => {
  return localRestaurants.filter(restaurant => restaurant.priceRange === priceRange);
};

export const getRestaurantsByCuisine = (cuisine: string) => {
  return localRestaurants.filter(restaurant => 
    restaurant.cuisine.some(c => c.toLowerCase().includes(cuisine.toLowerCase()))
  );
};

export const getRestaurantsByVibeTag = (vibeTag: string) => {
  return localRestaurants.filter(restaurant => 
    restaurant.vibeTags.some(tag => tag.toLowerCase().includes(vibeTag.toLowerCase()))
  );
};

export const getNearbyRestaurants = (maxDistance: number) => {
  return localRestaurants.filter(restaurant => 
    restaurant.location.distanceFromCampusKm <= maxDistance
  );
};