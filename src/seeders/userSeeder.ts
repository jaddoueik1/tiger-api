import bcrypt from 'bcryptjs';
import { User } from '../models';
import { UserRole } from '../types';

export const seedUsers = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding users...');
    
    // Clear existing data
    await User.deleteMany({});
    
    // Create default users
    const userData = [
      {
        email: 'admin@tigermuaythailb.com',
        name: 'Admin User',
        passwordHash: await bcrypt.hash('admin123', 10),
        roles: [UserRole.ADMIN],
        memberships: [],
        credits: 0
      },
      {
        email: 'member@example.com',
        name: 'John Doe',
        phone: '+961 71 234-567',
        passwordHash: await bcrypt.hash('member123', 10),
        roles: [UserRole.MEMBER],
        memberships: [],
        credits: 10
      },
      {
        email: 'coach@tigermuaythailb.com',
        name: 'Coach Demo',
        passwordHash: await bcrypt.hash('coach123', 10),
        roles: [UserRole.COACH],
        memberships: [],
        credits: 0
      }
    ];
    
    await User.insertMany(userData);
    
    console.log(`✅ Seeded ${userData.length} users`);
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    throw error;
  }
};