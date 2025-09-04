import { ContentBlock } from '../models';

export class ContentService {
  static async getContentByKey(key: string, locale: string = 'en'): Promise<any | null> {
    const content = await ContentBlock.findOne({ key, locale });
    return content?.json || null;
  }

  static async updateContent(key: string, locale: string, json: any): Promise<any> {
    return ContentBlock.findOneAndUpdate(
      { key, locale },
      { json },
      { upsert: true, new: true }
    );
  }

  static async getAllContent(locale: string = 'en'): Promise<any[]> {
    return ContentBlock.find({ locale }).sort({ key: 1 });
  }
}