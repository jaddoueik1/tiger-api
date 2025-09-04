import { ClassTemplate, ClassDiscipline, Coach } from '../models';
import { templates } from '../data/templates';

export const seedTemplates = async (): Promise<void> => {
  try {
    console.log('🌱 Seeding class templates...');
    
    // Clear existing data
    await ClassTemplate.deleteMany({});
    
    // Get discipline and coach mappings
    const disciplines = await ClassDiscipline.find({});
    const coaches = await Coach.find({});
    
    const disciplineMap = new Map(disciplines.map(d => [d.slug, d._id]));
    const coachMap = new Map(coaches.map(c => [c.name, c._id]));
    
    // Map old IDs to new ObjectIds
    const disciplineIdMap: { [oldId: string]: any } = {
      '1': disciplineMap.get('brazilian-jiu-jitsu'),
      '2': disciplineMap.get('muay-thai'),
      '3': disciplineMap.get('boxing'),
      '4': disciplineMap.get('mma'),
    };
    
    const coachIdMap: { [oldId: string]: any } = {
      '1': coachMap.get('Rafael Silva'),
      '2': coachMap.get('Kru Sirisak'),
      '3': coachMap.get('Mike Thompson'),
      '4': coachMap.get('Amanda Rodriguez'),
      '5': coachMap.get('Carlos Mendez'),
    };
    
    // Transform templates
    const templateData = templates.map(template => ({
      disciplineId: disciplineIdMap[template.disciplineId],
      title: template.title,
      level: template.level,
      durationMin: template.durationMin,
      description: template.description,
      gearNeeded: template.gearNeeded,
      coachIds: template.coachIds.map(id => coachIdMap[id]).filter(Boolean),
      price: template.price,
      prerequisites: template.prerequisites
    })).filter(t => t.disciplineId); // Only include templates with valid discipline
    
    await ClassTemplate.insertMany(templateData);
    
    console.log(`✅ Seeded ${templateData.length} class templates`);
  } catch (error) {
    console.error('❌ Error seeding templates:', error);
    throw error;
  }
};