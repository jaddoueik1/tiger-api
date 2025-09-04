import { ClassDiscipline, ClassTemplate, ClassSession, Coach } from '../models';

export class ClassService {
  static async getAllDisciplines(): Promise<any[]> {
    return ClassDiscipline.find({}).sort({ name: 1 });
  }

  static async getClassTemplates(filters: {
    discipline?: string;
    level?: string;
    coachId?: string;
  }): Promise<any[]> {
    const query: any = {};
    
    if (filters.discipline) {
      const discipline = await ClassDiscipline.findOne({ slug: filters.discipline });
      if (discipline) {
        query.disciplineId = discipline._id;
      }
    }
    
    if (filters.level) {
      query.level = filters.level;
    }
    
    if (filters.coachId) {
      query.coachIds = filters.coachId;
    }
    
    return ClassTemplate.find(query)
      .populate('disciplineId', 'name slug')
      .populate('coachIds', 'name photo specialties')
      .sort({ title: 1 });
  }

  static async getClassSessions(filters: {
    from?: Date;
    to?: Date;
    discipline?: string;
    level?: string;
    coachId?: string;
    locationId?: string;
  }): Promise<any[]> {
    const query: any = {};
    
    if (filters.from || filters.to) {
      query.startAt = {};
      if (filters.from) query.startAt.$gte = filters.from;
      if (filters.to) query.startAt.$lte = filters.to;
    }
    
    if (filters.coachId) {
      query.coachId = filters.coachId;
    }
    
    if (filters.locationId) {
      query.locationId = filters.locationId;
    }
    
    let sessions = await ClassSession.find(query)
      .populate({
        path: 'templateId',
        populate: {
          path: 'disciplineId',
          model: 'ClassDiscipline'
        }
      })
      .populate('coachId', 'name photo specialties')
      .sort({ startAt: 1 });
    
    // Filter by discipline and level if specified
    if (filters.discipline || filters.level) {
      sessions = sessions.filter(session => {
        const template = session.templateId as any;
        const discipline = template?.disciplineId as any;
        
        if (filters.discipline && discipline?.slug !== filters.discipline) {
          return false;
        }
        
        if (filters.level && template?.level !== filters.level) {
          return false;
        }
        
        return true;
      });
    }
    
    return sessions;
  }
}