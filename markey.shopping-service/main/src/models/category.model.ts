import { Schema, model, Document, Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface representing a document in MongoDB.
export interface ICategory extends Document {
  id: string;
  name: string;
  picture: string;

  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  createBy: string;
  updateBy: string;
}

// Create a Schema corresponding to the document interface.
const categorySchema = new Schema<ICategory>({
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true, unique: true },
  picture: { type: String, required: false },

  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
  deleteAt: { type: Date, default: null },
  createBy: { type: String, required: false },
  updateBy: { type: String, required: false }
});

// Create a Model.
const Category = model<ICategory>('Category', categorySchema);

export default Category;
