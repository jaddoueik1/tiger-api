import bcrypt from 'bcryptjs';
import { Coach, ICoach, User } from '../models';
import { UserRole } from '../types';

export class CoachService {
  static async getAllCoaches(specialty?: string): Promise<ICoach[]> {
    const query: any = {roles: UserRole.COACH };
    console.log(await User.find(query));
    return User.find(query).sort({ name: 1 });
  }

  static async getCoachById(id: string): Promise<ICoach | null> {
    return User.findOne({ _id: id, roles: UserRole.COACH });
  }

  static async createCoach(data: ICoach): Promise<ICoach> {
    const roles = data.roles || [];
    if (!roles.includes(UserRole.COACH)) roles.push(UserRole.COACH);
    data.passwordHash = await bcrypt.hash(data.password, 10);
    delete data.password;
    return User.create({ ...data, roles });
  }

  static async updateCoach(id: string, data: Partial<ICoach>): Promise<ICoach | null> {
    return User.findOneAndUpdate({ _id: id, roles: UserRole.COACH }, data, { new: true });
  }

  static async deleteCoach(id: string): Promise<ICoach | null> {
    return User.findOneAndUpdate({ _id: id, roles: UserRole.COACH }, { isActive: false }, { new: true });
  }

  static async getCoachAvailability(
    coachId: string, 
    fromDate: Date, 
    toDate: Date
  ): Promise<any[]> {
    const coach = await Coach.findOne({ _id: coachId, roles: UserRole.COACH });
    if (!coach) {
      throw new Error('Coach not found');
    }

    // Generate availability slots based on rules
    const availableSlots = [];
    const current = new Date(fromDate);
    
    while (current <= toDate) {
      const dayOfWeek = current.getDay();
      const rule = coach?.availabilityRules?.find(r => r.dayOfWeek === dayOfWeek);
      
      if (rule) {
        const [startHour, startMin] = rule.startTime.split(':').map(Number);
        const [endHour, endMin] = rule.endTime.split(':').map(Number);
        
        for (let hour = startHour; hour < endHour; hour++) {
          const slotStart = new Date(current);
          slotStart.setHours(hour, 0, 0, 0);
          
          const slotEnd = new Date(slotStart);
          slotEnd.setHours(hour + 1, 0, 0, 0);
          
          // Skip if in the past
          if (slotStart <= new Date()) continue;
          
          availableSlots.push({
            startAt: slotStart,
            endAt: slotEnd,
            price: coach.hourlyRate || 100,
          });
        }
      }
      
      current.setDate(current.getDate() + 1);
    }
    
    return availableSlots;
  }
}
