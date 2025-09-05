import { ClassDiscipline, ClassTemplate, ClassSession, IClassDiscipline, IClassTemplate, IClassSession } from '../models';

export class ClassService {
  static async getAllDisciplines(): Promise<any[]> {
    return ClassDiscipline.find({}).sort({ name: 1 });
  }

  static async createDiscipline(data: IClassDiscipline): Promise<any> {
    return ClassDiscipline.create(data);
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

  static async getClassTemplateById(id: string): Promise<any | null> {
    return ClassTemplate.findById(id)
      .populate('disciplineId', 'name slug')
      .populate('coachIds', 'name photo specialties');
  }

  static async createClassTemplate(data: IClassTemplate): Promise<any> {
    return ClassTemplate.create(data);
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

  static async createClassSession(data: IClassSession): Promise<any> {
    return ClassSession.create(data);
  }

  static async updateDiscipline(id: string, data: Partial<IClassDiscipline>): Promise<any | null> {
    return ClassDiscipline.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteDiscipline(id: string): Promise<any | null> {
    return ClassDiscipline.findByIdAndDelete(id);
  }

  static async updateClassTemplate(id: string, data: Partial<IClassTemplate>): Promise<any | null> {
    return ClassTemplate.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteClassTemplate(id: string): Promise<any | null> {
    return ClassTemplate.findByIdAndDelete(id);
  }

  static async updateClassSession(id: string, data: Partial<IClassSession>): Promise<any | null> {
    return ClassSession.findByIdAndUpdate(id, data, { new: true });
  }

  static async deleteClassSession(id: string): Promise<any | null> {
    return ClassSession.findByIdAndDelete(id);
  }
}
