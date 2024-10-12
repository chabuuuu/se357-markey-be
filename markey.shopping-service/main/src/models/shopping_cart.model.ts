import { ICartItem } from '@/models/cart_item.model';
import { Schema, model, Document, Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface representing a document in MongoDB.
export interface IShoppingCart extends Document {
  id: string;
  shopperId: string;
}

// Create a Schema corresponding to the document interface.
const shoppingCartSchema = new Schema<IShoppingCart>({
  id: { type: String, default: uuidv4 },
  shopperId: { type: String, required: true }
});

// Create a Model.
const ShoppingCart = model<IShoppingCart>('ShoppingCart', shoppingCartSchema);

export default ShoppingCart;
