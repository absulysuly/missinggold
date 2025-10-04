// Iraqi Governorates Data
export const IRAQI_GOVERNORATES = [
  { id: 'baghdad', name: { en: 'Baghdad', ar: 'بغداد', ku: 'بەغدا' }, region: 'central', population: 8000000 },
  { id: 'basra', name: { en: 'Basra', ar: 'البصرة', ku: 'بەسرە' }, region: 'south', population: 2600000 },
  { id: 'erbil', name: { en: 'Erbil', ar: 'أربيل', ku: 'هەولێر' }, region: 'kurdistan', population: 1750000 },
  { id: 'sulaymaniyah', name: { en: 'Sulaymaniyah', ar: 'السليمانية', ku: 'سلێمانی' }, region: 'kurdistan', population: 2100000 },
  { id: 'duhok', name: { en: 'Duhok', ar: 'دهوك', ku: 'دهۆک' }, region: 'kurdistan', population: 1300000 },
  { id: 'najaf', name: { en: 'Najaf', ar: 'النجف', ku: 'نەجەف' }, region: 'south', population: 1400000 },
  { id: 'karbala', name: { en: 'Karbala', ar: 'كربلاء', ku: 'کەربەلا' }, region: 'south', population: 1200000 },
  { id: 'mosul', name: { en: 'Mosul', ar: 'الموصل', ku: 'مووسڵ' }, region: 'north', population: 1800000 },
  { id: 'kirkuk', name: { en: 'Kirkuk', ar: 'كركوك', ku: 'کەرکووک' }, region: 'north', population: 1500000 },
  { id: 'anbar', name: { en: 'Anbar', ar: 'الأنبار', ku: 'ئەنبار' }, region: 'west', population: 1700000 },
  { id: 'diyala', name: { en: 'Diyala', ar: 'ديالى', ku: 'دیالە' }, region: 'central', population: 1600000 },
  { id: 'babil', name: { en: 'Babylon', ar: 'بابل', ku: 'بابل' }, region: 'central', population: 2000000 },
  { id: 'wasit', name: { en: 'Wasit', ar: 'واسط', ku: 'واسط' }, region: 'central', population: 1300000 },
  { id: 'saladin', name: { en: 'Saladin', ar: 'صلاح الدين', ku: 'سەلاحەدین' }, region: 'north', population: 1500000 },
  { id: 'qadisiyyah', name: { en: 'Al-Qādisiyyah', ar: 'القادسية', ku: 'قادسیە' }, region: 'south', population: 1200000 },
  { id: 'thi_qar', name: { en: 'Dhi Qar', ar: 'ذي قار', ku: 'زی قار' }, region: 'south', population: 2000000 },
  { id: 'maysan', name: { en: 'Maysan', ar: 'ميسان', ku: 'مەیسان' }, region: 'south', population: 1000000 },
  { id: 'muthanna', name: { en: 'Al Muthanna', ar: 'المثنى', ku: 'موسەنا' }, region: 'south', population: 750000 }
];

// Complete Category System with Subcategories
export const CATEGORIES = [
  {
    id: 'hotels',
    icon: '🏨',
    label: { en: 'Hotels', ar: 'الفنادق', ku: 'هۆتێلەکان' },
    color: 'from-amber-500 to-orange-600',
    subcategories: [
      { id: 'luxury', name: { en: 'Luxury', ar: 'فاخرة', ku: 'فاخیر' } },
      { id: 'budget', name: { en: 'Budget', ar: 'اقتصادية', ku: 'ئابووری' } },
      { id: 'family', name: { en: 'Family-Friendly', ar: 'عائلية', ku: 'خێزانی' } },
      { id: 'business', name: { en: 'Business', ar: 'أعمال', ku: 'بازرگانی' } },
      { id: 'heritage', name: { en: 'Heritage and Boutique', ar: 'تراثية وبوتيك', ku: 'مێژوویی و بووتیک' } },
      { id: 'resorts', name: { en: 'Resorts and Spa', ar: 'منتجعات وسبا', ku: 'ڕیزۆرت و سپا' } }
    ]
  },
  {
    id: 'restaurants',
    icon: '🍽️',
    label: { en: 'Restaurants', ar: 'المطاعم', ku: 'چێشتخانەکان' },
    color: 'from-rose-500 to-pink-600',
    subcategories: [
      { id: 'iraqi', name: { en: 'Iraqi Cuisine', ar: 'مأكولات عراقية', ku: 'خواردنی عێراقی' } },
      { id: 'grills', name: { en: 'Grills and Kebab', ar: 'مشاوي وكباب', ku: 'برژانگ و کەباب' } },
      { id: 'seafood', name: { en: 'Seafood and Fish', ar: 'أسماك ومأكولات بحرية', ku: 'ماسی و خواردنی دەریایی' } },
      { id: 'international', name: { en: 'International', ar: 'عالمية', ku: 'نێودەوڵەتی' } },
      { id: 'fastfood', name: { en: 'Fast Food', ar: 'وجبات سريعة', ku: 'خواردنی خێرا' } },
      { id: 'familydining', name: { en: 'Family Dining', ar: 'طعام عائلي', ku: 'خواردنی خێزانی' } }
    ]
  },
  {
    id: 'cafes',
    icon: '☕',
    label: { en: 'Cafés', ar: 'المقاهي', ku: 'چایخانەکان' },
    color: 'from-amber-600 to-yellow-600',
    subcategories: [
      { id: 'tea', name: { en: 'Traditional Tea Houses', ar: 'بيوت الشاي التقليدية', ku: 'چایخانە تەقلیدیەکان' } },
      { id: 'shisha', name: { en: 'Shisha Lounges', ar: 'صالات الشيشة', ku: 'هۆڵی شیشە' } },
      { id: 'specialty', name: { en: 'Specialty Coffee Shops', ar: 'محال القهوة المختصة', ku: 'دووکانی قاوەی تایبەت' } },
      { id: 'dessert', name: { en: 'Dessert and Ice Cream', ar: 'حلويات وايس كريم', ku: 'شیرینی و بەستەنی' } },
      { id: 'outdoor', name: { en: 'Outdoor and Garden', ar: 'خارجية وحدائق', ku: 'دەرەوە و باخچە' } },
      { id: 'youth', name: { en: 'Trendy Youth Cafés', ar: 'مقاهي الشباب العصرية', ku: 'چایخانەی گەنجانی مۆدێرن' } }
    ]
  },
  {
    id: 'services',
    icon: '🛠️',
    label: { en: 'Services', ar: 'الخدمات', ku: 'خزمەتگوزارییەکان' },
    color: 'from-slate-500 to-gray-600',
    subcategories: [
      { id: 'events', name: { en: 'Event Planning and Venues', ar: 'تنظيم الأحداث والأماكن', ku: 'پلاندانانی بۆنە و شوێن' } },
      { id: 'photography', name: { en: 'Photography and Videography', ar: 'التصوير والفيديو', ku: 'وێنەگرتن و ڤیدیۆ' } },
      { id: 'tailoring', name: { en: 'Tailoring and Fashion', ar: 'الخياطة والأزياء', ku: 'دوورین و فاشن' } },
      { id: 'decor', name: { en: 'Decor and Lighting', ar: 'الديكور والإضاءة', ku: 'ڕازاندنەوە و ڕووناکی' } },
      { id: 'logistics', name: { en: 'Transportation and Logistics', ar: 'النقل واللوجستيات', ku: 'گواستنەوە و لۆژیستیک' } },
      { id: 'handicrafts', name: { en: 'Handicrafts and Artisans', ar: 'الحرف اليدوية والحرفيين', ku: 'دەستکرد و هونەرمەندان' } },
      { id: 'health', name: { en: 'Health Services', ar: 'الخدمات الصحية', ku: 'خزمەتگوزاری تەندروستی' } },
      { id: 'education', name: { en: 'Education Services', ar: 'الخدمات التعليمية', ku: 'خزمەتگوزاری پەروەردە' } },
      { id: 'beauty', name: { en: 'Beauty and Salons', ar: 'التجميل والصالونات', ku: 'جوانکاری و سالۆن' } }
    ]
  },
  {
    id: 'events',
    icon: '🎉',
    label: { en: 'Events', ar: 'الفعاليات', ku: 'بۆنەکان' },
    color: 'from-purple-500 to-indigo-600',
    subcategories: [
      { id: 'social', name: { en: 'Social Events', ar: 'فعاليات اجتماعية', ku: 'بۆنەی کۆمەڵایەتی' } },
      { id: 'business', name: { en: 'Business Events', ar: 'فعاليات تجارية', ku: 'بۆنەی بازرگانی' } },
      { id: 'trade', name: { en: 'Trade Shows', ar: 'معارض تجارية', ku: 'پیشانگای بازرگانی' } },
      { id: 'conferences', name: { en: 'Conferences', ar: 'مؤتمرات', ku: 'کۆنگرە' } },
      { id: 'education', name: { en: 'Educational Events', ar: 'فعاليات تعليمية', ku: 'بۆنەی پەروەردەیی' } },
      { id: 'kids', name: { en: 'Kids and Family Events', ar: 'فعاليات أطفال وعائلية', ku: 'بۆنەی منداڵ و خێزانی' } },
      { id: 'music', name: { en: 'Music and Concerts', ar: 'موسيقى وحفلات', ku: 'مۆزیک و کۆنسێرت' } },
      { id: 'art', name: { en: 'Art Exhibitions', ar: 'معارض فنية', ku: 'پیشانگای هونەری' } }
    ]
  },
  {
    id: 'entertainment',
    icon: '🎭',
    label: { en: 'Entertainment', ar: 'الترفيه', ku: 'کات بەسەربردن' },
    color: 'from-pink-500 to-purple-600',
    subcategories: [
      { id: 'cinema', name: { en: 'Cinema and Films', ar: 'سينما وأفلام', ku: 'سینەما و فیلم' } },
      { id: 'livemusic', name: { en: 'Live Music and Performances', ar: 'موسيقى حية وعروض', ku: 'مۆزیکی زیندوو و نمایش' } },
      { id: 'arcades', name: { en: 'Game Zones and Arcades', ar: 'مناطق الألعاب والأركيد', ku: 'ناوچەی یاری و ئارکەید' } },
      { id: 'parks', name: { en: 'Amusement Parks', ar: 'مدن الألعاب', ku: 'پارکی یاری' } }
    ]
  },
  {
    id: 'shopping',
    icon: '🛍️',
    label: { en: 'Shopping', ar: 'التسوق', ku: 'بازاڕگەری' },
    color: 'from-blue-500 to-indigo-600',
    subcategories: [
      { id: 'markets', name: { en: 'Traditional Markets', ar: 'أسواق تقليدية', ku: 'بازاڕی تەقلیدی' } },
      { id: 'malls', name: { en: 'Modern Malls', ar: 'مراكز تجارية حديثة', ku: 'مۆڵی مۆدێرن' } },
      { id: 'gold', name: { en: 'Gold and Jewelry', ar: 'ذهب ومجوهرات', ku: 'زێڕ و خشڵ' } },
      { id: 'antiques', name: { en: 'Handicrafts and Antiques', ar: 'حرف يدوية وتحف', ku: 'دەستکرد و کۆن' } },
      { id: 'perfumes', name: { en: 'Perfumes and Spices', ar: 'عطور وبهارات', ku: 'بۆن و بەهار' } },
      { id: 'clothing', name: { en: 'Clothing and Textiles', ar: 'ملابس ونسيج', ku: 'جل و چەوروقاش' } }
    ]
  },
  {
    id: 'transport',
    icon: '🚌',
    label: { en: 'Transportation', ar: 'المواصلات', ku: 'گواستنەوە' },
    color: 'from-green-500 to-emerald-600',
    subcategories: [
      { id: 'cars', name: { en: 'Car Rentals', ar: 'تأجير السيارات', ku: 'کرێدانی ئۆتۆمبێل' } },
      { id: 'buses', name: { en: 'Bus Services', ar: 'خدمات الحافلات', ku: 'خزمەتگوزاری پاس' } },
      { id: 'taxis', name: { en: 'Taxi Services', ar: 'خدمات التاكسي', ku: 'خزمەتگوزاری تاکسی' } },
      { id: 'ridehailing', name: { en: 'Ride-Hailing (Careem, Uber, Kubak)', ar: 'طلب الرحلات (كريم، أوبر، كوباك)', ku: 'داوای سەفەر (کەریم، ئوبەر، کووباک)' } },
      { id: 'shuttles', name: { en: 'Tourist Shuttles', ar: 'حافلات سياحية', ku: 'پاسی گەشتیاری' } }
    ]
  },
  {
    id: 'tourism',
    icon: '🗿',
    label: { en: 'Tourism', ar: 'السياحة', ku: 'گەشتیاری' },
    color: 'from-teal-500 to-cyan-600',
    subcategories: [
      { id: 'historical', name: { en: 'Historical Sites and Ruins', ar: 'مواقع تاريخية وآثار', ku: 'شوێنی مێژوویی و کۆن' } },
      { id: 'religious', name: { en: 'Religious Shrines and Pilgrimage', ar: 'مزارات دينية وحج', ku: 'زیارەتگای ئاینی و حەج' } },
      { id: 'natural', name: { en: 'Natural Attractions', ar: 'مناطق طبيعية', ku: 'ناوچەی سروشتی' } },
      { id: 'museums', name: { en: 'Museums and Heritage Centers', ar: 'متاحف ومراكز تراث', ku: 'مۆزەخانە و ناوەندی مێژوو' } },
      { id: 'unesco', name: { en: 'UNESCO World Heritage Sites', ar: 'مواقع التراث العالمي لليونسكو', ku: 'شوێنی مێژووی جیهانی یونیسکۆ' } },
      { id: 'picnic', name: { en: 'Picnic and Family Parks', ar: 'حدائق نزهة وعائلية', ku: 'پارکی گەشت و خێزانی' } }
    ]
  }
];

// Filter Types and Options
export const FILTER_OPTIONS = {
  priceRanges: [
    { id: 'budget', symbol: '$', range: [0, 50] },
    { id: 'moderate', symbol: '$$', range: [50, 150] },
    { id: 'expensive', symbol: '$$$', range: [150, 300] },
    { id: 'luxury', symbol: '$$$$', range: [300, Infinity] }
  ],
  ratings: [1, 2, 3, 4, 5],
  distanceRanges: [1, 2, 5, 10, 25, 50],
  amenities: {
    general: ['wifi', 'parking', 'wheelchair_access', 'pet_friendly', 'outdoor_seating'],
    restaurants: ['delivery', 'takeout', 'vegetarian', 'halal', 'credit_cards', 'reservations'],
    hotels: ['pool', 'gym', 'spa', 'business_center', 'room_service', 'airport_shuttle'],
    entertainment: ['family_friendly', 'group_discounts', 'birthday_packages', 'photo_ops']
  }
};

// Hero Carousel Images (Category-specific demo images)
export const HERO_IMAGES = {
  hotels: [
    { id: 1, emoji: '🏨', url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800' },
    { id: 2, emoji: '🏛️', url: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800' },
    { id: 3, emoji: '🛏️', url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800' },
    { id: 4, emoji: '🏰', url: 'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800' },
  ],
  restaurants: [
    { id: 1, emoji: '🍽️', url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800' },
    { id: 2, emoji: '🥘', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800' },
    { id: 3, emoji: '🍖', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800' },
    { id: 4, emoji: '🥗', url: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800' },
  ],
  cafes: [
    { id: 1, emoji: '☕', url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800' },
    { id: 2, emoji: '🍰', url: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800' },
    { id: 3, emoji: '🧋', url: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800' },
    { id: 4, emoji: '🥐', url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800' },
  ],
  default: [
    { id: 1, emoji: '🏙️', url: 'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800' },
    { id: 2, emoji: '🌆', url: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800' },
    { id: 3, emoji: '🕌', url: 'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?w=800' },
    { id: 4, emoji: '🌃', url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800' },
  ]
};

// Mock API Data with Full Multilingual Support
export const FEATURED_PLACES = [
  {
    id: 1,
    name: 'Al-Rashid Hotel',
    translations: { en: 'Al-Rashid Hotel', ar: 'فندق الرشيد', ku: 'هۆتێلی ڕەشید' },
    description: { en: 'Iconic luxury hotel in central Baghdad', ar: 'فندق فاخر أيقوني في وسط بغداد', ku: 'هۆتێلی فاخیری ناوداری ناوەڕاستی بەغدا' },
    category: 'hotels',
    subcategory: 'luxury',
    governorate: 'baghdad',
    rating: 4.5,
    price: '$$$',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop',
    imageEmoji: '🏛️',
    location: '2.3 km away',
    amenities: ['wifi', 'parking', 'pool', 'gym'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 2,
    name: 'Sumer Garden Restaurant',
    translations: { en: 'Sumer Garden Restaurant', ar: 'مطعم حديقة سومر', ku: 'چێشتخانەی باخچەی سومەر' },
    description: { en: 'Traditional Iraqi cuisine with garden seating', ar: 'مأكولات عراقية تقليدية مع جلسات حديقة', ku: 'خواردنی عێراقی تەقلیدی لەگەڵ دانیشتنی باخچە' },
    category: 'restaurants',
    subcategory: 'iraqi',
    governorate: 'baghdad',
    rating: 4.8,
    price: '$$',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&h=600&fit=crop',
    imageEmoji: '🍽️',
    location: '1.5 km away',
    amenities: ['outdoor_seating', 'delivery', 'halal'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 3,
    name: 'Baghdad Tower Café',
    translations: { en: 'Baghdad Tower Café', ar: 'مقهى برج بغداد', ku: 'چایخانەی بوورجی بەغدا' },
    description: { en: 'Specialty coffee with panoramic city views', ar: 'قهوة متخصصة مع إطلالة بانورامية للمدينة', ku: 'قاوەی تایبەت لەگەڵ دیمەنی پانۆرامیی شار' },
    category: 'cafes',
    subcategory: 'specialty',
    governorate: 'baghdad',
    rating: 4.6,
    price: '$',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&h=600&fit=crop',
    imageEmoji: '☕',
    location: '3.1 km away',
    amenities: ['wifi', 'outdoor_seating', 'takeout'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 4,
    name: 'Babylon Grand Hotel',
    translations: { en: 'Babylon Grand Hotel', ar: 'فندق بابل الكبير', ku: 'هۆتێلی گەورەی بابل' },
    description: { en: 'Modern comfort near historic sites', ar: 'راحة حديثة بالقرب من المواقع التاريخية', ku: 'ئاسوودەیی مۆدێرن نزیک شوێنی مێژوویی' },
    category: 'hotels',
    subcategory: 'family',
    governorate: 'babil',
    rating: 4.3,
    price: '$$',
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop',
    imageEmoji: '🏨',
    location: '1.2 km away',
    amenities: ['wifi', 'parking', 'family_friendly', 'restaurant'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 5,
    name: 'Tigris Fish Restaurant',
    translations: { en: 'Tigris Fish Restaurant', ar: 'مطعم أسماك دجلة', ku: 'چێشتخانەی ماسیی دجلە' },
    description: { en: 'Fresh fish dishes by the riverside', ar: 'أطباق سمك طازج على ضفاف النهر', ku: 'خواردنی ماسیی تازە لەسەر کەناری ڕووبار' },
    category: 'restaurants',
    subcategory: 'seafood',
    governorate: 'baghdad',
    rating: 4.7,
    price: '$$',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&h=600&fit=crop',
    imageEmoji: '🐟',
    location: '4.5 km away',
    amenities: ['outdoor_seating', 'halal', 'family_friendly'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 6,
    name: 'Heritage Souk Bazaar',
    translations: { en: 'Heritage Souk Bazaar', ar: 'بازار السوق التراثي', ku: 'بازاڕی سووقی مێژوویی' },
    description: { en: 'Traditional market with local crafts', ar: 'سوق تقليدي مع حرف محلية', ku: 'بازاڕی تەقلیدی لەگەڵ دەستکردی خۆجی' },
    category: 'shopping',
    subcategory: 'markets',
    governorate: 'baghdad',
    rating: 4.4,
    price: '$',
    image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=800&h=600&fit=crop',
    imageEmoji: '🏪',
    location: '2.8 km away',
    amenities: ['cash_only', 'authentic_goods'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 7,
    name: 'Erbil Rotana Hotel',
    translations: { en: 'Erbil Rotana Hotel', ar: 'فندق روتانا أربيل', ku: 'هۆتێلی ڕۆتانا هەولێر' },
    description: { en: 'Five-star luxury in Kurdistan capital', ar: 'فخامة خمس نجوم في عاصمة كردستان', ku: 'فاخیریی پێنج ئەستێرە لە پایتەختی کوردستان' },
    category: 'hotels',
    subcategory: 'luxury',
    governorate: 'erbil',
    rating: 4.8,
    price: '$$$$',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&h=600&fit=crop',
    imageEmoji: '🏨',
    location: '1.0 km away',
    amenities: ['pool', 'spa', 'gym', 'business_center', 'wifi'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 8,
    name: 'Masgouf House',
    translations: { en: 'Masgouf House', ar: 'بيت المسكوف', ku: 'ماڵی مەسگووف' },
    description: { en: 'Famous for traditional Iraqi grilled fish', ar: 'مشهور بالسمك العراقي المشوي', ku: 'بەناوبانگ بە ماسیی برژاوی عێراقی' },
    category: 'restaurants',
    subcategory: 'seafood',
    governorate: 'basra',
    rating: 4.9,
    price: '$$',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
    imageEmoji: '🐟',
    location: '0.5 km away',
    amenities: ['outdoor_seating', 'halal', 'traditional'],
    isOpen: true,
    isFeatured: true
  },
  {
    id: 9,
    name: 'Chai Khana Traditional',
    translations: { en: 'Chai Khana Traditional', ar: 'بيت الشاي التقليدي', ku: 'چایخانەی تەقلیدی' },
    description: { en: 'Authentic tea house with local atmosphere', ar: 'بيت شاي أصيل مع أجواء محلية', ku: 'چایخانەی ڕەسەن لەگەڵ باری خۆجی' },
    category: 'cafes',
    subcategory: 'tea',
    governorate: 'sulaymaniyah',
    rating: 4.5,
    price: '$',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop',
    imageEmoji: '🍵',
    location: '1.8 km away',
    amenities: ['traditional', 'outdoor_seating', 'shisha'],
    isOpen: true,
    isFeatured: true
  }
];

export const SPONSORS = [
  'Iraqi Airways',
  'Zain Iraq',
  'Asia Cell',
  'Babylon Hotel Group',
  'Rafidain Bank',
  'Al-Mansour Group',
  'Baghdad Mall',
  'Kurdistan Tourism Board'
];

// Helper Functions
export const getCityName = (cityId: string, locale: 'en' | 'ar' | 'ku') => {
  const city = IRAQI_GOVERNORATES.find(c => c.id === cityId);
  return city ? city.name[locale] : cityId;
};

export const getCategoryLabel = (categoryId: string, locale: 'en' | 'ar' | 'ku') => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  return category ? category.label[locale] : categoryId;
};

export const getSubcategoryName = (categoryId: string, subcategoryId: string, locale: 'en' | 'ar' | 'ku') => {
  const category = CATEGORIES.find(c => c.id === categoryId);
  if (!category) return subcategoryId;
  
  const subcategory = category.subcategories.find(s => s.id === subcategoryId);
  return subcategory ? subcategory.name[locale] : subcategoryId;
};

export const filterPlacesByGovernorate = (places: typeof FEATURED_PLACES, governorate: string) => {
  if (governorate === 'all') return places;
  return places.filter(place => place.governorate === governorate);
};

export const filterPlacesByCategory = (places: typeof FEATURED_PLACES, category: string) => {
  return places.filter(place => place.category === category);
};