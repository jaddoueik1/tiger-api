import { Product, ProductCategory } from '../models';

export class ProductService {
  static async getAllCategories(): Promise<any[]> {
    return ProductCategory.find({}).sort({ name: 1 });
  }

  static async getProducts(filters: {
    query?: string;
    categoryId?: string;
    inStock?: boolean;
    sort?: string;
    page?: number;
    limit?: number;
  }): Promise<{ products: any[]; total: number; totalPages: number }> {
    const query: any = { isActive: true };
    
    if (filters.query) {
      query.$text = { $search: filters.query };
    }
    
    if (filters.categoryId) {
      query.categoryId = filters.categoryId;
    }
    
    if (filters.inStock) {
      query.stock = { $gt: 0 };
    }
    
    // Sorting
    let sort: any = {};
    switch (filters.sort) {
      case 'price_asc':
        sort = { price: 1 };
        break;
      case 'price_desc':
        sort = { price: -1 };
        break;
      case 'name_asc':
        sort = { title: 1 };
        break;
      default:
        sort = { createdAt: -1 };
    }
    
    // Pagination
    const page = filters.page || 1;
    const limit = filters.limit || 12;
    const skip = (page - 1) * limit;
    
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('categoryId', 'name slug')
        .sort(sort)
        .skip(skip)
        .limit(limit),
      Product.countDocuments(query)
    ]);
    
    return {
      products,
      total,
      totalPages: Math.ceil(total / limit)
    };
  }

  static async getProductById(id: string): Promise<any | null> {
    return Product.findOne({ _id: id, isActive: true })
      .populate('categoryId', 'name slug');
  }
}