import { MembershipPlan, type IMembershipPlan } from '../models';

export class MembershipPlanService {
  static async getAllPlans(): Promise<IMembershipPlan[]> {
    return MembershipPlan.find({ isActive: true }).sort({ price: 1 });
  }

  static async getPlanById(id: string): Promise<IMembershipPlan | null> {
    return MembershipPlan.findOne({ _id: id, isActive: true });
  }

  static async createPlan(data: Partial<IMembershipPlan>): Promise<IMembershipPlan> {
    const plan = new MembershipPlan(data);
    return plan.save();
  }

  static async updatePlan(id: string, data: Partial<IMembershipPlan>): Promise<IMembershipPlan | null> {
    return MembershipPlan.findByIdAndUpdate(id, data, { new: true });
  }

  static async deletePlan(id: string): Promise<IMembershipPlan | null> {
    return MembershipPlan.findByIdAndUpdate(id, { isActive: false }, { new: true });
  }
}
