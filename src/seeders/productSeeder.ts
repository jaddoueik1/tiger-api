import { Product, ProductCategory } from '../models';
import { categories, products } from '../data/products';

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
    
    // Create category mapping
    const categoryMap = new Map(insertedCategories.map(c => [c.slug, c._id]));
    const categoryIdMap: { [oldId: string]: any } = {
      '1': categoryMap.get('gi-uniforms'),
      '2': categoryMap.get('gloves-protection'),
      '3': categoryMap.get('apparel'),
      '4': categoryMap.get('accessories'),
      '5': categoryMap.get('supplements'),
    };
    
    // Transform products
    const productData = products.map(product => ({
      sku: product.sku,
      title: product.title,
      description: product.description,
      categoryId: categoryIdMap[product.categoryId],
      images: product.images,
      variants: product.variants,
      price: product.price,
      compareAtPrice: product.compareAtPrice,
      stock: product.stock,
      attributes: product.attributes,
      isActive: product.isActive
    })).filter(p => p.categoryId); // Only include products with valid category
    
    await Product.insertMany(productData);
    
    console.log(`✅ Seeded ${productData.length} products`);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
};