import bcrypt from 'bcryptjs';
import { IBookedSession, ICoach, User } from '../models';
import { UserRole } from '../types';

export class CoachService {
  static async getAllCoaches(specialty?: string): Promise<ICoach[]> {
    const query: any = { roles: UserRole.COACH };

    if (specialty) {
      query.specialties = specialty;
    }
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

  static async getCoachBookedSessions(id: string): Promise<IBookedSession[]> {
    const coach = await CoachService.getCoachById(id);

    if (!coach) {
      throw new Error('Coach not found');
    }

    return coach.bookedSessions ?? [];
  }
}
