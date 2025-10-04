'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
    category: {
        name: string;
        icon: string;
        path: string;
        color: string;
    };
    index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
        >
            <Link href={category.path} legacyBehavior>
                <a
                    className="block p-6 rounded-2xl bg-white/10 backdrop-blur-lg border border-white/20 
                     transition-all duration-300 hover:bg-white/20 hover:border-white/30"
                >
                    <div
                        className="absolute -top-3 -right-3 w-16 h-16 rounded-full opacity-20 blur-lg transition-all duration-500 group-hover:opacity-40 group-hover:w-24 group-hover:h-24"
                        style={{ backgroundColor: category.color }}
                    ></div>
                    <div className="relative z-10">
                        <div className="text-4xl mb-4" style={{ color: category.color }}>
                            <i className={`fa-solid ${category.icon}`}></i>
                        </div>
                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                    </div>
                </a>
            </Link>
        </motion.div>
    );
};

export default CategoryCard;