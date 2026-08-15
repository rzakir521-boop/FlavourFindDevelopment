export const PREFERENCE_CATEGORIES = [
  {
    id: "cravings",
    title: "Taste & Cravings",
    subtitle: "What flavours are you in the mood for?",
    icon: "Flame",
    options: [
      { id: "spicy", label: "Spicy" },
      { id: "sweet", label: "Sweet" },
      { id: "sour", label: "Sour" },
      { id: "savoury", label: "Savoury" },
      { id: "umami", label: "Umami" },
      { id: "rich", label: "Rich & Hearty" },
      { id: "fresh", label: "Fresh & Light" },
      { id: "smoky", label: "Smoky" },
    ],
  },
  {
    id: "dietary",
    title: "Dietary Requirements",
    subtitle: "Any allergies, restrictions, or cultural needs?",
    icon: "Leaf",
    options: [
      { id: "halal", label: "Halal" },
      { id: "kosher", label: "Kosher" },
      { id: "vegan", label: "Vegan" },
      { id: "vegetarian", label: "Vegetarian" },
      { id: "gluten-free", label: "Gluten-Free" },
      { id: "dairy-free", label: "Dairy-Free" },
      { id: "nut-free", label: "Nut-Free" },
      { id: "pescatarian", label: "Pescatarian" },
    ],
  },
  {
    id: "cuisine",
    title: "Cuisine Type",
    subtitle: "Any cuisine you're craving — or skip to keep it open.",
    icon: "UtensilsCrossed",
    options: [
      { id: "japanese", label: "Japanese" },
      { id: "indian", label: "Indian" },
      { id: "italian", label: "Italian" },
      { id: "mexican", label: "Mexican" },
      { id: "chinese", label: "Chinese" },
      { id: "greek", label: "Greek" },
      { id: "turkish", label: "Turkish" },
      { id: "korean", label: "Korean" },
      { id: "caribbean", label: "Caribbean" },
      { id: "middle-eastern", label: "Middle Eastern" },
      { id: "thai", label: "Thai" },
      { id: "french", label: "French" },
    ],
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
