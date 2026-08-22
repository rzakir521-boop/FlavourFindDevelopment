function slugify(label) {
  return label
    .toLowerCase()
    .replace(/[()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function opts(labels) {
  return labels.map((label) => ({ id: slugify(label), label }));
}

export const PREFERENCE_CATEGORIES = [
  {
    id: "cravings",
    title: "Taste & Cravings",
    subtitle: "What flavours are you in the mood for?",
    icon: "Flame",
    options: opts([
      "Sweet",
      "Savoury",
      "Spicy",
      "Sour",
      "Salty",
      "Bitter",
      "Umami",
      "Smoky",
      "Tangy",
      "Rich/Creamy",
      "Light/Fresh",
      "Fried/Crispy",
      "Comfort Food",
      "Something New/Adventurous",
      "Healthy/Clean",
      "Indulgent/Treat Yourself",
      "Warming (Soups, Stews)",
      "Cold/Refreshing (Salads, Cold Noodles)",
      "Cheesy",
      "Meaty/Protein-Heavy",
      "Grilled/Char",
      "Sweet and Sour",
      "Hearty/Filling",
      "Snacky/Small Plates",
    ]),
  },
  {
    id: "dietary",
    title: "Dietary Requirements",
    subtitle: "Any allergies, restrictions, or cultural needs?",
    icon: "Leaf",
    options: opts([
      "Vegetarian",
      "Vegan",
      "Pescatarian",
      "Halal",
      "Kosher",
      "Gluten-Free",
      "Dairy-Free/Lactose Intolerant",
      "Nut-Free",
      "Shellfish Allergy",
      "Egg-Free",
      "Soy-Free",
      "Low-Carb/Keto",
      "Low-Fat",
      "Low-Sugar/Diabetic-Friendly",
      "Low-Sodium",
      "Paleo",
      "FODMAP-Friendly",
      "No Pork",
      "No Red Meat",
      "No Alcohol (in Food/Cooking)",
      "High-Protein",
      "Calorie-Conscious",
    ]),
  },
  {
    id: "cuisine",
    title: "Cuisine Type",
    subtitle: "Any cuisine you're craving — or skip to keep it open.",
    icon: "UtensilsCrossed",
    options: opts([
      "Italian",
      "Chinese",
      "Japanese",
      "Thai",
      "Vietnamese",
      "Korean",
      "Indian",
      "Pakistani/Bangladeshi",
      "Malaysian/Indonesian",
      "Middle Eastern (Lebanese, Turkish, etc.)",
      "Mexican",
      "Spanish",
      "French",
      "Greek",
      "Caribbean",
      "West African",
      "Ethiopian/East African",
      "American (BBQ, Diner-Style)",
      "British/Sunday Roast",
      "Portuguese",
      "Brazilian/South American",
      "Fusion",
      "Seafood-Focused",
      "Vegan/Plant-Based Specialty",
    ]),
  },
];

export const ALL_OPTIONS = PREFERENCE_CATEGORIES.flatMap((c) =>
  c.options.map((o) => ({ ...o, category: c.id }))
);

export function getOptionLabel(categoryId, optionId) {
  const cat = PREFERENCE_CATEGORIES.find((c) => c.id === categoryId);
  if (!cat) return optionId;
  const opt = cat.options.find((o) => o.id === optionId);
  return opt ? opt.label : optionId;
}
