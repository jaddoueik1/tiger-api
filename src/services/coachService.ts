import { Coach } from '../models';
import { ApiResponse } from '../types';

export class CoachService {
  static async getAllCoaches(specialty?: string): Promise<Coach[]> {
    const query: any = { isActive: true };
    
    if (specialty) {
      query.specialties = { 
        $regex: specialty, 
        $options: 'i' 
      };
    }
    
    return Coach.find(query).sort({ name: 1 });
  }

  static async getCoachById(id: string): Promise<Coach | null> {
    return Coach.findOne({ _id: id, isActive: true });
  }

  static async getCoachAvailability(
    coachId: string, 
    fromDate: Date, 
    toDate: Date
  ): Promise<any[]> {
    const coach = await Coach.findById(coachId);
    if (!coach) {
      throw new Error('Coach not found');
    }

    // Generate availability slots based on rules
    const availableSlots = [];
    const current = new Date(fromDate);
    
    while (current <= toDate) {
      const dayOfWeek = current.getDay();
      const rule = coach.availabilityRules.find(r => r.dayOfWeek === dayOfWeek);
      
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