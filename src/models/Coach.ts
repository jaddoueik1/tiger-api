import mongoose from 'mongoose';
import { User, type IUser, type ISocialLink, type IBookedSession } from './User';

export interface ICoach extends IUser {
    password: string; // Plain text password for creation only
}

export const Coach = User as mongoose.Model<ICoach>;

export { ISocialLink, IBookedSession };
