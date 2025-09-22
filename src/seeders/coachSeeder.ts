import bcrypt from 'bcryptjs';
import { Coach } from '../models';
import { UserRole } from '../types';
import { coaches } from '../data/coaches';

export const seedCoaches = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding coaches...');
    
    // Clear existing coach data only
    await Coach.deleteMany({ roles: UserRole.COACH });
    
    // Insert new data
    const coachData = await Promise.all(coaches.map(async (coach, index) => ({
      email: `coach${index + 1}@example.com`,
      name: coach.name,
      passwordHash: await bcrypt.hash('coach123', 10),
      bio: coach.bio,
      accolades: coach.accolades,
      socials: coach.socials,
      photo: coach.photo,
      specialties: coach.specialties,
      bookedSessions: coach.bookedSessions,
      hourlyRate: coach.hourlyRate,
      isActive: coach.isActive,
      roles: [UserRole.COACH]
    })));
    
    await Coach.insertMany(coachData);
    
    console.log(`✅ Seeded ${coachData.length} coaches`);
  } catch (error) {
    console.error('❌ Error seeding coaches:', error);
    throw error;
  }
};