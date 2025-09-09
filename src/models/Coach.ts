import mongoose from 'mongoose';
import { User, type IUser, type ISocialLink, type IAvailabilityRule } from './User';

export interface ICoach extends IUser {}

export const Coach = User as mongoose.Model<ICoach>;

export { ISocialLink, IAvailabilityRule };
