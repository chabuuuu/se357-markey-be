import { ICartItem } from '@/models/cart_item.model';
import { Schema, model, Document, Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface representing a document in MongoDB.
export interface IShoppingCart extends Document {
  _id: Schema.Types.ObjectId;
  shopperId: string;
  cartItems: ICartItem[];
}

// Create a Schema corresponding to the document interface.
const shoppingCartSchema = new Schema<IShoppingCart>({
  _id: { type: Schema.Types.ObjectId, auto: true },

  shopperId: { type: String, required: true },
  cartItems: [{ type: Schema.Types.ObjectId, ref: 'CartItem' }]
});

// Create a Model.
const ShoppingCart = model<IShoppingCart>('ShoppingCart', shoppingCartSchema);

export default ShoppingCart;
