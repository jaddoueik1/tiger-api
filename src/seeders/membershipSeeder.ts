import { MembershipPlan } from '../models';
import { membershipPlans } from '../data/memberships';

export const seedMembershipPlans = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding membership plans...');
    
    // Clear existing data
    await MembershipPlan.deleteMany({});
    
    // Insert new data
    const planData = membershipPlans.map(plan => ({
      name: plan.name,
      price: plan.price,
      currency: plan.currency,
      period: plan.period,
      benefits: plan.benefits,
      maxClassesPerPeriod: plan.maxClassesPerPeriod,
      classAccess: plan.classAccess,
      terms: plan.terms,
      isPopular: plan.isPopular,
      isActive: true
    }));
    
    await MembershipPlan.insertMany(planData);
    
    console.log(`✅ Seeded ${planData.length} membership plans`);
  } catch (error) {
    console.error('❌ Error seeding membership plans:', error);
    throw error;
  }
};