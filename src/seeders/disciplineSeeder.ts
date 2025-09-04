import { ClassDiscipline } from '../models';
import { disciplines } from '../data/disciplines';

export const seedDisciplines = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding disciplines...');
    
    // Clear existing data
    await ClassDiscipline.deleteMany({});
    
    // Insert new data
    const disciplineData = disciplines.map(discipline => ({
      slug: discipline.slug,
      name: discipline.name,
      description: discipline.description,
      tags: discipline.tags,
      media: discipline.media
    }));
    
    await ClassDiscipline.insertMany(disciplineData);
    
    console.log(`✅ Seeded ${disciplineData.length} disciplines`);
  } catch (error) {
    console.error('❌ Error seeding disciplines:', error);
    throw error;
  }
};