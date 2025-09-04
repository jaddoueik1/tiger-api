import { ContentBlock } from '../models';
import { contentBlocks } from '../data/content';

export const seedContent = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding content blocks...');
    
    // Clear existing data
    await ContentBlock.deleteMany({});
    
    // Insert new data
    const contentData = contentBlocks.map(block => ({
      key: block.key,
      locale: block.locale,
      json: block.json
    }));
    
    await ContentBlock.insertMany(contentData);
    
    console.log(`✅ Seeded ${contentData.length} content blocks`);
  } catch (error) {
    console.error('❌ Error seeding content:', error);
    throw error;
  }
};