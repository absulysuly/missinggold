/**
 * Category and Subcategory Seed Script
 * Populates the database with predefined categories from categories.json
 */

import { PrismaClient } from '@prisma/client';
import categoriesData from '../data/categories.json';

const prisma = new PrismaClient();

/**
 * Helper function to create a URL-friendly slug
 */
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-')     // Replace spaces with hyphens
    .replace(/-+/g, '-')      // Replace multiple hyphens with single hyphen
    .trim();
}

async function seedCategories() {
  console.log('🌱 Starting category seeding...');

  let categoryCount = 0;
  let subcategoryCount = 0;

  for (let i = 0; i < categoriesData.categories.length; i++) {
    const categoryData = categoriesData.categories[i];
    
    const slug = slugify(categoryData.label);
    
    // Upsert category
    const category = await prisma.category.upsert({
      where: { label: categoryData.label },
      update: {
        icon: categoryData.icon,
        slug,
        displayOrder: i,
      },
      create: {
        label: categoryData.label,
        icon: categoryData.icon,
        slug,
        displayOrder: i,
      },
    });

    categoryCount++;
    console.log(`✅ Category: ${category.label} (${category.icon})`);

    // Seed subcategories
    for (let j = 0; j < categoryData.subcategories.length; j++) {
      const subData = categoryData.subcategories[j];
      const subSlug = slugify(subData.name);

      await prisma.subcategory.upsert({
        where: {
          categoryId_subcategoryId: {
            categoryId: category.id,
            subcategoryId: subData.id,
          },
        },
        update: {
          name: subData.name,
          slug: subSlug,
          displayOrder: j,
        },
        create: {
          subcategoryId: subData.id,
          name: subData.name,
          slug: subSlug,
          categoryId: category.id,
          displayOrder: j,
        },
      });

      subcategoryCount++;
      console.log(`   ↳ ${subData.name} (${subData.id})`);
    }
  }

  console.log(`\n✨ Seeding complete!`);
  console.log(`📊 Created/Updated: ${categoryCount} categories, ${subcategoryCount} subcategories`);
}

async function main() {
  try {
    await seedCategories();
  } catch (error) {
    console.error('❌ Error seeding categories:', error);
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('Fatal error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
