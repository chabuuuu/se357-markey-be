import { Schema, model, Document, Model, Types } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface IShoppingCart extends Document {
  id: Types.ObjectId;
  shopper_id: string;
}

// Create a Schema corresponding to the document interface.
const shoppingCartSchema = new Schema<IShoppingCart>({
  id: { type: Schema.Types.ObjectId, auto: true },
  shopper_id: { type: String, required: true }
});

// Create a Model.
const ShoppingCart = model<IShoppingCart>('shoppingCart', shoppingCartSchema);

export default ShoppingCart;
