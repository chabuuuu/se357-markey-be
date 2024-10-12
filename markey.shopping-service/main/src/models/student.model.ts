import { Schema, model, Document, Model } from 'mongoose';

// Define an interface representing a document in MongoDB.
export interface IStudent extends Document {
  name: string;
  age: number;
  email: string;
  enrolled: boolean;
  courses: string[];
}

// Create a Schema corresponding to the document interface.
const studentSchema = new Schema<IStudent>({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  enrolled: { type: Boolean, default: false },
  courses: { type: [String], default: [] }
});

// Create a Model.
const Student = model<IStudent>('Student', studentSchema);

export default Student;
