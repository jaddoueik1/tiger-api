import mongoose from "mongoose";
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
		prices?: {
			dropIn?: number;
			pack10?: number;
			monthly?: number;
			unlimited?: number;
		};
	}) {
		const discipline = new ClassDiscipline(data);
		return discipline.save();
	}

	static async updateDiscipline(
		id: string,
		data: Partial<{
			name: string;
			description?: string;
			mediaItems?: any[];
			prices?: {
				dropIn?: number;
				pack10?: number;
				monthly?: number;
				unlimited?: number;
			};
		}>
	) {
		return ClassDiscipline.findByIdAndUpdate(id, data, { new: true });
	}

	static async deleteDiscipline(id: string) {
		return ClassDiscipline.findByIdAndDelete(id);
	}

	static async getClassTemplates() {
		return ClassTemplate.find().populate("disciplineId").sort({ name: 1 });
	}

	static async getClassTemplatesByDisciplineId(disciplineId: string) {
		return ClassTemplate.find({ disciplineId })
			.populate("disciplineId")
			.sort({ title: 1 });
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
		return ClassTemplate.findOne({ slug }).populate("disciplineId");
	}

    static async getClassTemplateById(id: string) {
        return ClassTemplate.findById(id).populate("disciplineId");
    }

	static async updateClassTemplate(
		id: string,
		data: Partial<{
			disciplineId: string;
			title: string;
			level: string;
			coaches: string[];
			durationMin: number;
			description: string;
			price?: number;
			prerequisites?: string[];
		}>
	) {
		const { coaches, ...otherFields } = data;

		// Optional: dedupe & cast to ObjectId if your schema uses ObjectId
		let nextCoaches: any[] | undefined = undefined;
		if (Array.isArray(coaches)) {
			nextCoaches = Array.from(new Set(coaches)).map((x) => {
				try {
					return new mongoose.Types.ObjectId(x);
				} catch {
					return x; // if your schema uses String, this is fine
				}
			});
		}

		const update: any = { $set: { ...otherFields } };
		if (nextCoaches !== undefined) {
			update.$set.coaches = nextCoaches; // full replace
		}

		return ClassTemplate.findByIdAndUpdate(id, update, {
			new: true,
			runValidators: true,
		});
	}

	static async deleteClassTemplate(id: string) {
		return ClassTemplate.findByIdAndDelete(id);
	}
}
