// Enhanced book data with diverse titles, authors, and genres
export const booksData = [
  // Fiction
  {
    id: 1,
    title: "The Seven Husbands of Evelyn Hugo",
    author: "Taylor Jenkins Reid",
    price: 599,
    discountedPrice: 449,
    imageUrl: "https://picsum.photos/280/400?random=1",
    description: "A reclusive Hollywood icon finally tells her story to a young journalist, revealing seven marriages and countless secrets.",
    category: "fiction",
    genre: "Contemporary Fiction",
    publisher: "Atria Books",
    language: "English",
    quantity: 45,
    averageRating: 4.6,
    numRatings: 1250
  },
  {
    id: 2,
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    price: 650,
    discountedPrice: 520,
    imageUrl: "https://picsum.photos/280/400?random=2",
    description: "A mystery and coming-of-age story set in the marshlands of North Carolina.",
    category: "fiction",
    genre: "Mystery Fiction",
    publisher: "G.P. Putnam's Sons",
    language: "English",
    quantity: 32,
    averageRating: 4.4,
    numRatings: 2100
  },
  {
    id: 3,
    title: "The Midnight Library",
    author: "Matt Haig",
    price: 550,
    discountedPrice: 440,
    imageUrl: "https://picsum.photos/280/400?random=3",
    description: "Between life and death there is a library, and within that library, the shelves go on forever.",
    category: "feel-good",
    genre: "Philosophical Fiction",
    publisher: "Canongate Books",
    language: "English",
    quantity: 28,
    averageRating: 4.2,
    numRatings: 890
  },
  {
    id: 4,
    title: "The Song of Achilles",
    author: "Madeline Miller",
    price: 575,
    discountedPrice: 460,
    imageUrl: "https://picsum.photos/280/400?random=4",
    description: "A tale of gods, kings, immortal fame and the human heart, retelling the story of Achilles and Patroclus.",
    category: "fiction",
    genre: "Historical Fiction",
    publisher: "Ecco",
    language: "English",
    quantity: 22,
    averageRating: 4.7,
    numRatings: 1680
  },
  {
    id: 5,
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    price: 625,
    discountedPrice: 500,
    imageUrl: "https://picsum.photos/280/400?random=5",
    description: "A thrilling book that offers a look at our changing world through the eyes of an unforgettable narrator.",
    category: "fiction",
    genre: "Science Fiction",
    publisher: "Faber & Faber",
    language: "English",
    quantity: 35,
    averageRating: 4.1,
    numRatings: 756
  },

  // Non-Fiction
  {
    id: 6,
    title: "Educated",
    author: "Tara Westover",
    price: 699,
    discountedPrice: 559,
    imageUrl: "https://picsum.photos/280/400?random=6",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge.",
    category: "non-fiction",
    genre: "Memoir",
    publisher: "Random House",
    language: "English",
    quantity: 40,
    averageRating: 4.5,
    numRatings: 1890
  },
  {
    id: 7,
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    price: 750,
    discountedPrice: 600,
    imageUrl: "https://picsum.photos/280/400?random=7",
    description: "How did our species succeed in the battle for dominance? Why did our foraging ancestors come together to create cities and kingdoms?",
    category: "non-fiction",
    genre: "History",
    publisher: "Harper",
    language: "English",
    quantity: 55,
    averageRating: 4.3,
    numRatings: 2340
  },
  {
    id: 8,
    title: "Atomic Habits",
    author: "James Clear",
    price: 650,
    discountedPrice: 520,
    imageUrl: "https://picsum.photos/280/400?random=8",
    description: "An easy & proven way to build good habits & break bad ones. Tiny changes, remarkable results.",
    category: "non-fiction",
    genre: "Self-Help",
    publisher: "Avery",
    language: "English",
    quantity: 48,
    averageRating: 4.4,
    numRatings: 1567
  },

  // Comics & Graphic Novels
  {
    id: 9,
    title: "Watchmen",
    author: "Alan Moore",
    price: 899,
    discountedPrice: 719,
    imageUrl: "https://picsum.photos/280/400?random=9",
    description: "A gripping, labyrinthine piece of comic art, a landmark in the graphic novel medium.",
    category: "comics",
    genre: "Graphic Novel",
    publisher: "DC Comics",
    language: "English",
    quantity: 25,
    averageRating: 4.6,
    numRatings: 890
  },
  {
    id: 10,
    title: "Maus I: A Survivor's Tale",
    author: "Art Spiegelman",
    price: 750,
    discountedPrice: 600,
    imageUrl: "https://picsum.photos/280/400?random=10",
    description: "A brutally moving work of art—widely hailed as the greatest graphic novel ever written.",
    category: "comics",
    genre: "Historical Graphic Novel",
    publisher: "Pantheon Books",
    language: "English",
    quantity: 18,
    averageRating: 4.5,
    numRatings: 1234
  },
  {
    id: 11,
    title: "Persepolis",
    author: "Marjane Satrapi",
    price: 695,
    discountedPrice: 556,
    imageUrl: "https://picsum.photos/280/400?random=11",
    description: "The story of a precocious and outspoken Iranian girl's coming of age during the Islamic Revolution.",
    category: "comics",
    genre: "Autobiographical Graphic Novel",
    publisher: "Pantheon Books",
    language: "English",
    quantity: 22,
    averageRating: 4.4,
    numRatings: 987
  },

  // Feel-Good Books
  {
    id: 12,
    title: "The House in the Cerulean Sea",
    author: "TJ Klune",
    price: 525,
    discountedPrice: 420,
    imageUrl: "https://picsum.photos/280/400?random=12",
    description: "A magical and heartwarming story about found family, love, and the power of being true to yourself.",
    category: "feel-good",
    genre: "Fantasy Romance",
    publisher: "Tor Books",
    language: "English",
    quantity: 38,
    averageRating: 4.7,
    numRatings: 1456
  },
  {
    id: 13,
    title: "Beach Read",
    author: "Emily Henry",
    price: 475,
    discountedPrice: 380,
    imageUrl: "https://picsum.photos/280/400?random=13",
    description: "A romance writer who no longer believes in love and a literary writer stuck in a rut engage in a summer-long challenge.",
    category: "feel-good",
    genre: "Contemporary Romance",
    publisher: "Berkley",
    language: "English",
    quantity: 42,
    averageRating: 4.3,
    numRatings: 1123
  },
  {
    id: 14,
    title: "The Alchemist",
    author: "Paulo Coelho",
    price: 399,
    discountedPrice: 319,
    imageUrl: "https://picsum.photos/280/400?random=14",
    description: "A magical story that inspires us to follow our dreams and listen to our hearts.",
    category: "feel-good",
    genre: "Philosophical Fiction",
    publisher: "HarperOne",
    language: "English",
    quantity: 65,
    averageRating: 4.2,
    numRatings: 2890
  },

  // More Fiction
  {
    id: 15,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    price: 550,
    discountedPrice: 440,
    imageUrl: "https://picsum.photos/280/400?random=15",
    description: "A woman's act of violence against her husband and her refusal to speak sends shockwaves through London.",
    category: "fiction",
    genre: "Psychological Thriller",
    publisher: "Celadon Books",
    language: "English",
    quantity: 33,
    averageRating: 4.1,
    numRatings: 1678
  },
  {
    id: 16,
    title: "Normal People",
    author: "Sally Rooney",
    price: 525,
    discountedPrice: 420,
    imageUrl: "https://picsum.photos/280/400?random=16",
    description: "A story of mutual fascination, friendship and love between two people who change each other's lives.",
    category: "fiction",
    genre: "Literary Fiction",
    publisher: "Hogarth",
    language: "English",
    quantity: 29,
    averageRating: 4.0,
    numRatings: 1345
  },

  // More Non-Fiction
  {
    id: 17,
    title: "Becoming",
    author: "Michelle Obama",
    price: 799,
    discountedPrice: 639,
    imageUrl: "https://picsum.photos/280/400?random=17",
    description: "An intimate, powerful, and inspiring memoir by the former First Lady of the United States.",
    category: "non-fiction",
    genre: "Biography",
    publisher: "Crown",
    language: "English",
    quantity: 44,
    averageRating: 4.6,
    numRatings: 2567
  },
  {
    id: 18,
    title: "The Power of Now",
    author: "Eckhart Tolle",
    price: 450,
    discountedPrice: 360,
    imageUrl: "https://picsum.photos/280/400?random=18",
    description: "A guide to spiritual enlightenment that has the power to transform your life.",
    category: "non-fiction",
    genre: "Spirituality",
    publisher: "New World Library",
    language: "English",
    quantity: 51,
    averageRating: 4.2,
    numRatings: 1789
  }
];

// Featured books for carousel
export const featuredBooks = [
  booksData[0], // The Seven Husbands of Evelyn Hugo
  booksData[2], // The Midnight Library
  booksData[5], // Educated
  booksData[11], // The House in the Cerulean Sea
  booksData[6], // Sapiens
  booksData[8] // Watchmen
];

// Books by category
export const getBooksByCategory = (category) => {
  if (category === 'all') return booksData;
  return booksData.filter(book => book.category === category);
};

// Search books
export const searchBooks = (query, filters = {}) => {
  let results = booksData;
  
  // Text search
  if (query) {
    const searchTerm = query.toLowerCase();
    results = results.filter(book => 
      book.title.toLowerCase().includes(searchTerm) ||
      book.author.toLowerCase().includes(searchTerm) ||
      book.genre.toLowerCase().includes(searchTerm)
    );
  }
  
  // Category filter
  if (filters.category && filters.category !== 'all') {
    results = results.filter(book => book.category === filters.category);
  }
  
  // Price range filter
  if (filters.minPrice) {
    results = results.filter(book => 
      (book.discountedPrice || book.price) >= filters.minPrice
    );
  }
  
  if (filters.maxPrice) {
    results = results.filter(book => 
      (book.discountedPrice || book.price) <= filters.maxPrice
    );
  }
  
  // Discount filter
  if (filters.hasDiscount) {
    results = results.filter(book => 
      book.discountedPrice && book.discountedPrice < book.price
    );
  }
  
  return results;
};

export default booksData;