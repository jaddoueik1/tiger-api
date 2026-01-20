import { categories, products } from '../data/products';
import { Product, ProductCategory } from '../models';

export const seedProducts = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding product categories and products...');
    
    // Clear existing data
    await ProductCategory.deleteMany({});
    await Product.deleteMany({});
    
    // Seed categories first
    const categoryData = categories.map(category => ({
      name: category.name,
      slug: category.slug
    }));
    
    const insertedCategories = await ProductCategory.insertMany(categoryData);
    console.log(`✅ Seeded ${insertedCategories.length} product categories`);
    
    // Map old category IDs to new MongoDB _id values
    const idToSlug = new Map(categories.map(cat => [cat.id, cat.slug]));
    const slugToId = new Map(insertedCategories.map(cat => [cat.slug, cat._id]));

    // Transform products
    const productData = products
      .map(product => {
        const slug = idToSlug.get(product.categoryId);
        if (!slug) return null;
        const categoryId = slugToId.get(slug);
        if (!categoryId) return null;
        return {
          sku: product.sku,
          title: product.title,
          description: product.description,
          categoryId,
          images: product.images,
          variants: product.variants,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          stock: product.stock,
          attributes: product.attributes,
          isActive: product.isActive
        };
      })
      .filter(p => p); // Only include products with valid category

    await Product.insertMany(productData);

    console.log(`✅ Seeded ${productData.length} products`);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
};