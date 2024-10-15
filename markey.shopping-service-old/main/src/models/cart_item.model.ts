import { IProduct } from '@/models/product.model';
import { Schema, model, Document, Model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

// Define an interface representing a document in MongoDB.
export interface ICartItem extends Document {
  _id: Schema.Types.ObjectId;
  shoppingCart: Schema.Types.ObjectId;
  product: IProduct;
  amount: number;
}

// Create a Schema corresponding to the document interface.
const CartItemSchema = new Schema<ICartItem>({
  _id: { type: Schema.Types.ObjectId, auto: true },

  shoppingCart: { type: Schema.Types.ObjectId, required: true, ref: 'ShoppingCart' },
  product: { type: String, required: true, ref: 'Product' },
  amount: { type: Number, required: true, default: 1 }
});

// Create a Model.
const CartItem = model<ICartItem>('CartItem', CartItemSchema);

export default CartItem;
