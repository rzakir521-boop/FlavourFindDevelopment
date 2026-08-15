import { PREFERENCE_CATEGORIES } from "./preferenceData";

const SAMPLE_RESTAURANTS = [
  {
    name: "Dishoom",
    cuisine: "Indian",
    area: "Shoreditch",
    match_score: 95,
    price_range: "££",
    dietary_badges: ["Halal", "Vegetarian", "Vegan-friendly"],
    explanation:
      "Dishoom nails the spicy, rich flavours you're after with their legendary black daal and lamb chops. They cater brilliantly to vegetarian and halal diners, and the Shoreditch location buzzes with energy.",
    tags: { cravings: ["spicy", "rich", "savoury", "umami"], dietary: ["halal", "vegetarian", "vegan"], cuisine: ["indian"] },
  },
  {
    name: "Koya",
    cuisine: "Japanese",
    area: "Soho",
    match_score: 92,
    price_range: "££",
    dietary_badges: ["Vegetarian", "Vegan-friendly"],
    explanation:
      "Koya's handmade udon bowls are the definition of umami comfort — silky noodles in rich, savoury dashi broth. Their vegetable tempura is exceptional, and they handle dietary needs with real care.",
    tags: { cravings: ["umami", "savoury", "fresh", "rich"], dietary: ["vegetarian", "vegan"], cuisine: ["japanese"] },
  },
  {
    name: "Padella",
    cuisine: "Italian",
    area: "Borough Market",
    match_score: 90,
    price_range: "££",
    dietary_badges: ["Vegetarian"],
    explanation:
      "Padella's hand-rolled pasta is a London institution. The pappardelle with slow-cooked beef shin ragù delivers deep, rich flavours, while their cacio e pepe is a masterclass in savoury simplicity.",
    tags: { cravings: ["rich", "savoury", "umami"], dietary: ["vegetarian"], cuisine: ["italian"] },
  },
  {
    name: "Mangal 2",
    cuisine: "Turkish",
    area: "Dalston",
    match_score: 93,
    price_range: "££",
    dietary_badges: ["Halal", "Gluten-Free"],
    explanation:
      "Mangal 2 is a Dalston icon for smoky, charcoal-grilled meats. Every kebab is halal and bursting with smoky, spicy depth. Their grilled aubergine is a gluten-free stunner.",
    tags: { cravings: ["smoky", "spicy", "savoury", "rich"], dietary: ["halal", "gluten-free"], cuisine: ["turkish", "middle-eastern"] },
  },
  {
    name: "Tacos Padre",
    cuisine: "Mexican",
    area: "Borough Market",
    match_score: 88,
    price_range: "£",
    dietary_badges: ["Gluten-Free", "Dairy-Free"],
    explanation:
      "Tacos Padre serves some of London's best tacos — punchy, spicy, and piled with fresh salsas. Corn tortillas keep things naturally gluten-free, and the al pastor is smoky perfection.",
    tags: { cravings: ["spicy", "fresh", "smoky", "sour"], dietary: ["gluten-free", "dairy-free"], cuisine: ["mexican"] },
  },
  {
    name: "Bao",
    cuisine: "Taiwanese",
    area: "Soho",
    match_score: 89,
    price_range: "££",
    dietary_badges: ["Nut-Free"],
    explanation:
      "Bao's pillowy steamed buns with braised pork are an umami explosion. The fried chicken bao with slaw delivers that sweet-savoury balance you're craving, all in a fun, buzzy setting.",
    tags: { cravings: ["umami", "sweet", "savoury", "rich"], dietary: ["nut-free"], cuisine: ["chinese", "korean"] },
  },
  {
    name: "The Palomar",
    cuisine: "Middle Eastern",
    area: "Soho",
    match_score: 91,
    price_range: "£££",
    dietary_badges: ["Halal", "Vegetarian", "Gluten-Free"],
    explanation:
      "The Palomar brings Jerusalem's vibrant food scene to Soho. Their spiced lamb and polenta dish is rich and smoky, while the cauliflower with tahini is a vegetarian showstopper.",
    tags: { cravings: ["spicy", "rich", "smoky", "savoury"], dietary: ["halal", "vegetarian", "gluten-free"], cuisine: ["middle-eastern"] },
  },
  {
    name: "Rosa's Thai Café",
    cuisine: "Thai",
    area: "Spitalfields",
    match_score: 87,
    price_range: "£",
    dietary_badges: ["Vegan-friendly", "Gluten-Free"],
    explanation:
      "Rosa's is a brilliant spot for vibrant Thai flavours — their pad kra pao packs serious heat, while the green papaya salad hits every sour and fresh note. Generous with vegan options too.",
    tags: { cravings: ["spicy", "sour", "fresh"], dietary: ["vegan", "gluten-free"], cuisine: ["thai"] },
  },
  {
    name: "Maison Bab",
    cuisine: "Turkish",
    area: "Covent Garden",
    match_score: 86,
    price_range: "££",
    dietary_badges: ["Halal"],
    explanation:
      "Maison Bab reinvents the kebab with flair — the 24-hour marinated shawarma is smoky and rich, served in freshly baked flatbread. Everything is halal, and the flavours are deeply satisfying.",
    tags: { cravings: ["smoky", "rich", "spicy", "savoury"], dietary: ["halal"], cuisine: ["turkish"] },
  },
  {
    name: "Mildreds",
    cuisine: "Vegetarian",
    area: "Soho",
    match_score: 94,
    price_range: "££",
    dietary_badges: ["Vegetarian", "Vegan", "Gluten-Free", "Nut-Free"],
    explanation:
      "Mildreds is a vegetarian paradise with global flavours. Their Sri Lankan sweet potato curry is rich and spicy, and they take every allergy and dietary need seriously — clearly labelled and carefully prepared.",
    tags: { cravings: ["spicy", "rich", "fresh", "sweet"], dietary: ["vegetarian", "vegan", "gluten-free", "nut-free", "dairy-free"], cuisine: ["indian", "mexican", "japanese", "middle-eastern"] },
  },
  {
    name: "Le Relais de Venise",
    cuisine: "French",
    area: "Marylebone",
    match_score: 85,
    price_range: "£££",
    dietary_badges: ["Nut-Free"],
    explanation:
      "Le Relais keeps it simple — perfectly cooked steak-frites with their famous secret herb sauce. It's rich, savoury, and utterly indulgent. A proper Parisian bistro experience in London.",
    tags: { cravings: ["rich", "savoury", "umami"], dietary: ["nut-free"], cuisine: ["french"] },
  },
  {
    name: "The Real Greek",
    cuisine: "Greek",
    area: "Bankside",
    match_score: 84,
    price_range: "££",
    dietary_badges: ["Vegetarian", "Gluten-Free"],
    explanation:
      "The Real Greek serves fresh, vibrant mezze that's perfect for lighter appetites. Their grilled halloumi and tzatziki hit that fresh-and-savoury sweet spot, with plenty of naturally gluten-free options.",
    tags: { cravings: ["fresh", "savoury", "sour"], dietary: ["vegetarian", "gluten-free"], cuisine: ["greek"] },
  },
  {
    name: "Jerk City",
    cuisine: "Caribbean",
    area: "Shoreditch",
    match_score: 90,
    price_range: "£",
    dietary_badges: ["Halal", "Gluten-Free", "Dairy-Free"],
    explanation:
      "Jerk City brings big Caribbean heat — their jerk chicken is smoky, spicy, and fall-off-the-bone tender. Everything's halal, and the rice and peas with plantain is a gluten-free feast of flavour.",
    tags: { cravings: ["spicy", "smoky", "rich", "sweet"], dietary: ["halal", "gluten-free", "dairy-free"], cuisine: ["caribbean"] },
  },
  {
    name: "On The Bab",
    cuisine: "Korean",
    area: "Shoreditch",
    match_score: 88,
    price_range: "£",
    dietary_badges: ["Vegetarian"],
    explanation:
      "On The Bab serves punchy Korean street food — their KFC (Korean fried chicken) with gochujang glaze is sweet, spicy, and impossibly crispy. The kimchi fried rice is a savoury umami bomb.",
    tags: { cravings: ["spicy", "sweet", "umami", "savoury"], dietary: ["vegetarian"], cuisine: ["korean"] },
  },
  {
    name: "Ottolenghi",
    cuisine: "Middle Eastern",
    area: "Islington",
    match_score: 92,
    price_range: "£££",
    dietary_badges: ["Vegetarian", "Vegan-friendly", "Gluten-Free"],
    explanation:
      "Ottolenghi's vegetable-forward cooking is both fresh and deeply flavourful. Every dish bursts with herbs, spices, and colour. Their roasted aubergine with pomegranate is a masterpiece of sour and sweet.",
    tags: { cravings: ["fresh", "sour", "sweet", "savoury"], dietary: ["vegetarian", "vegan", "gluten-free"], cuisine: ["middle-eastern"] },
  },
];

function labelList(selections, categoryId) {
  const cat = PREFERENCE_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return [];
  return cat.options
    .filter((o) => selections[categoryId]?.includes(o.id))
    .map((o) => o.id);
}

function scoreRestaurant(restaurant, cravings, dietary, cuisines) {
  let score = 50;

  const cravingMatches = cravings.filter((c) => restaurant.tags.cravings.includes(c)).length;
  if (cravings.length > 0) {
    score += Math.round((cravingMatches / cravings.length) * 25);
  } else {
    score += 15;
  }

  const dietaryMatches = dietary.filter((d) => restaurant.tags.dietary.includes(d)).length;
  if (dietary.length > 0) {
    if (dietaryMatches === dietary.length) {
      score += 25;
    } else if (dietaryMatches > 0) {
      score += Math.round((dietaryMatches / dietary.length) * 15);
    } else {
      score -= 20;
    }
  } else {
    score += 10;
  }

  const cuisineMatches = cuisines.filter((c) => restaurant.tags.cuisine.includes(c)).length;
  if (cuisines.length > 0) {
    if (cuisineMatches > 0) score += 20;
    else score -= 10;
  } else {
    score += 5;
  }

  return Math.max(40, Math.min(98, score));
}

export async function getRecommendations({ location, preferences }) {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const cravings = labelList(preferences, "cravings");
  const dietary = labelList(preferences, "dietary");
  const cuisines = labelList(preferences, "cuisine");

  const scored = SAMPLE_RESTAURANTS.map((r) => ({
    ...r,
    match_score: scoreRestaurant(r, cravings, dietary, cuisines),
  }));

  scored.sort((a, b) => b.match_score - a.match_score);

  return scored.slice(0, 5).map(({ tags, ...rest }) => rest);
}
