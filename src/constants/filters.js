export const categoryOptions = [
    { value: "", label: "All Categories"},
    { value: "Overlay UI Packs", label: "Overlay UI Packs" },
    { value: "Stream Widgets & Components", label: "Widgets" },
    { value: "Custom Emotes & Badges", label: "Emotes & Badges" },
    { value: "Panels for Twitch or YouTube", label: "Panels" },
    { value: "Branding & Identity Assets", label: "Branding" }
];

export const tagOptions = [
    { value: "animated", label: "Animated" },
    { value: "artistic", label: "Artistic" },
    { value: "clean", label: "Clean" },
    { value: "cozy", label: "Cozy" },
    { value: "cute", label: "Cute" },
    { value: "dark", label: "Dark" },
    { value: "futuristic", label: "Futuristic" },
    { value: "gaming", label: "Gaming" },
    { value: "glitch", label: "Glitch" },
    { value: "minimalist", label: "Minimalist" },
    { value: "neon", label: "Neon" },
    { value: "pastel", label: "Pastel" },
    { value: "pixel art", label: "Pixel Art" },
    { value: "retro", label: "Retro" },
    { value: "sci-fi", label: "Sci-Fi" },
];

export const sortOptions = [
    { value: 'default', label: 'Default' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
];

export const initialFilters = {
    category: '',
    tags: [],
    minPrice: '0',
    maxPrice: '9900',
    sortBy: 'createdAt-desc', // Default sort
};