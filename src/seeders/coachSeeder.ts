import { Coach } from '../models';
import { coaches } from '../data/coaches';

export const seedCoaches = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding coaches...');
    
    // Clear existing data
    await Coach.deleteMany({});
    
    // Insert new data
    const coachData = coaches.map(coach => ({
      name: coach.name,
      bio: coach.bio,
      accolades: coach.accolades,
      socials: coach.socials,
      photo: coach.photo,
      specialties: coach.specialties,
      availabilityRules: coach.availabilityRules,
      hourlyRate: coach.hourlyRate,
      isActive: coach.isActive
    }));
    
    await Coach.insertMany(coachData);
    
    console.log(`✅ Seeded ${coachData.length} coaches`);
  } catch (error) {
    console.error('❌ Error seeding coaches:', error);
    throw error;
  }
};