import { connectDatabase, disconnectDatabase } from '../config/database';
import { seedDisciplines } from './disciplineSeeder';
import { seedCoaches } from './coachSeeder';
import { seedTemplates } from './templateSeeder';
import { seedProducts } from './productSeeder';
import { seedContent } from './contentSeeder';
import { seedMembershipPlans } from './membershipSeeder';
import { seedUsers } from './userSeeder';

export const runAllSeeders = async (): Promise<void> => {
  try {
    console.log('🚀 Starting database seeding...');
    
    await connectDatabase();
    
    // Run seeders in dependency order
    await seedDisciplines();
    await seedCoaches();
    await seedTemplates(); // Depends on disciplines and coaches
    await seedProducts();
    await seedContent();
    await seedMembershipPlans();
    await seedUsers();
    
    console.log('🎉 All seeders completed successfully!');
  } catch (error) {
    console.error('💥 Seeding failed:', error);
    throw error;
  } finally {
    await disconnectDatabase();
  }
};

// Run seeders if this file is executed directly
if (require.main === module) {
  runAllSeeders()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}