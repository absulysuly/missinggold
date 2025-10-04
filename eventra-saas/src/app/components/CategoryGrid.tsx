'use client';

import CategoryCard from './CategoryCard';

const categories = [
    { name: 'Events', icon: 'fa-calendar-days', path: '/events', color: '#B24BF3' },
    { name: 'Hotels', icon: 'fa-hotel', path: '/hotels', color: '#FF2E97' },
    { name: 'Restaurants', icon: 'fa-utensils', path: '/restaurants', color: '#FF6B35' },
    { name: 'Cafes', icon: 'fa-mug-saucer', path: '/cafes', color: '#FFED4E' },
    { name: 'Tourism', icon: 'fa-camera-retro', path: '/tourism', color: '#00F0FF' },
];

const CategoryGrid = () => {
    return (
        <div className="w-full max-w-6xl mx-auto px-4 py-16">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    Discover Iraq & Kurdistan
                </h1>
                <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto">
                    Explore the best events, venues, and attractions. Your journey starts here.
                </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {categories.map((category, index) => (
                    <CategoryCard key={category.name} category={category} index={index} />
                ))}
            </div>
            <div className="text-center mt-16">
                <p className="text-white/50 italic">
                    From ancient history to modern marvels, all in one place.
                </p>
            </div>
        </div>
    );
};

export default CategoryGrid;