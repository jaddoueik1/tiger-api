import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  sku: string;
  title: string;
  description: string;
  categoryId: mongoose.Types.ObjectId;
  images: string[];
  variants: IProductVariant[];
  price: number;
  compareAtPrice?: number;
  stock: number;
  attributes: IProductAttribute[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProductVariant {
  id: string;
  name: string;
  price: number;
  stock: number;
  attributes: { [key: string]: string };
}

export interface IProductAttribute {
  key: string;
  value: string;
}

export interface IProductCategory extends Document {
  name: string;
  slug: string;
  description?: string;
  parentId?: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const productVariantSchema = new Schema<IProductVariant>({
  id: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  attributes: { type: Map, of: String }
});

const productAttributeSchema = new Schema<IProductAttribute>({
  key: { type: String, required: true, trim: true },
  value: { type: String, required: true, trim: true }
});

const productSchema = new Schema<IProduct>({
  sku: { 
    type: String, 
    required: true, 
    unique: true,
    uppercase: true,
    trim: true
  },
  title: { type: String, required: true, trim: true },
  description: { type: String, required: true },
  categoryId: { 
    type: Schema.Types.ObjectId, 
    ref: 'ProductCategory', 
    required: true 
  },
  images: [{ type: String, required: true }],
  variants: [productVariantSchema],
  price: { type: Number, required: true, min: 0 },
  compareAtPrice: { type: Number, min: 0 },
  stock: { type: Number, required: true, min: 0 },
  attributes: [productAttributeSchema],
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const productCategorySchema = new Schema<IProductCategory>({
  name: { type: String, required: true, trim: true },
  slug: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true
  },
  description: { type: String },
  parentId: { type: Schema.Types.ObjectId, ref: 'ProductCategory' }
}, {
  timestamps: true
});

// Indexes
productSchema.index({ sku: 1 });
productSchema.index({ categoryId: 1 });
productSchema.index({ isActive: 1 });
productSchema.index({ title: 'text', description: 'text' });

productCategorySchema.index({ slug: 1 });
productCategorySchema.index({ parentId: 1 });

export const Product = mongoose.model<IProduct>('Product', productSchema);
export const ProductCategory = mongoose.model<IProductCategory>('ProductCategory', productCategorySchema);