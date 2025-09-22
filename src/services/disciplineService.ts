import { ClassDiscipline, ClassTemplate } from "../models";

export class DisciplineService {
	static async getAllDisciplines() {
		return ClassDiscipline.find().sort({ name: 1 });
	}

	static async getDisciplineById(id: string) {
		return ClassDiscipline.findById(id);
	}

	static async createDiscipline(data: {
		name: string;
		description?: string;
		mediaItems?: any[];
	}) {
		const discipline = new ClassDiscipline(data);
		return discipline.save();
	}

	static async updateDiscipline(
		id: string,
		data: Partial<{ name: string; description?: string; mediaItems?: any[] }>
	) {
		return ClassDiscipline.findByIdAndUpdate(id, data, { new: true });
	}

	static async deleteDiscipline(id: string) {
		return ClassDiscipline.findByIdAndDelete(id);
	}

    static async getClassTemplates() {
        return ClassTemplate.find().populate('disciplineId').sort({ name: 1 });
    }

    static async createClassTemplate(data: {
        disciplineId: string;
        title: string;
        level: string;
        durationMin: number;
        description: string;
        price?: number;
        prerequisites?: string[];
    }) {
        const template = new ClassTemplate(data);
        return template.save();
    }

    static async getClassTemplateBySlug(slug: string) {
        return ClassTemplate.findOne({ slug }).populate('disciplineId');
    }

    static async updateClassTemplate(
        id: string,
        data: Partial<{
            disciplineId: string;
            title: string;
            level: string;
            durationMin: number;
            description: string;
            price?: number;
            prerequisites?: string[];
        }>
    ) {
        return ClassTemplate.findByIdAndUpdate(id, data, { new: true });
    }

    static async deleteClassTemplate(id: string) {
        return ClassTemplate.findByIdAndDelete(id);
    }
}
