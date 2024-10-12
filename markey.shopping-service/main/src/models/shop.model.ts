import { Schema, model, Document, Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface representing a document in MongoDB.
export interface IShop extends Document {
  id: string;
  name: string;
  profilePicture: string;
  description: string;

  //fks
  salesmanId: string;

  createAt: Date;
  updateAt: Date;
  deleteAt: Date;
  createBy: string;
  updateBy: string;
}

// Create a Schema corresponding to the document interface.
const ShopSchema = new Schema<IShop>({
  // _id: { type: Schema.Types.ObjectId, auto: true },
  id: { type: String, default: uuidv4 },
  name: { type: String, required: true },
  profilePicture: { type: String, required: false },
  description: { type: String, required: false },
  salesmanId: { type: String, required: true },

  createAt: { type: Date, default: Date.now() },
  updateAt: { type: Date, default: Date.now() },
  deleteAt: { type: Date, default: null },
  createBy: { type: String, required: false },
  updateBy: { type: String, required: false }
});

// Create a Model.
const Shop = model<IShop>('Shop', ShopSchema);

export default Shop;
