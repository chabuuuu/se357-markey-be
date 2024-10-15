import { ICategory } from '@/models/category.model';
import { Schema, model, Document, Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface representing a document in MongoDB.
export interface IProduct extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  picture?: string;
  detail: any;
  tags: string[];

  //fk
  category: ICategory;

  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  createBy: string;
  updateBy: string;
}

// Create a Schema corresponding to the document interface.
const productSchema = new Schema<IProduct>({
  _id: { type: Schema.Types.ObjectId, auto: true },

  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  picture: { type: String, required: false },
  detail: { type: Object, required: true },
  tags: { type: [String], default: [] },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
  deleteAt: { type: Date, default: null },
  createBy: { type: String, required: false },
  updateBy: { type: String, required: false }
});

// Create a Model.
const Product = model<IProduct>('Product', productSchema);

export default Product;
