import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

// Ensure you run 'npm install @nestjs/mongoose mongoose' first at the root!

@Schema({ 
  timestamps: true, // Automatically adds createdAt and updatedAt fields
  collection: 'halls' // Explicitly names the MongoDB collection
})
export class HallBooking extends Document {
  @Prop({ type: String, required: true, unique: true })
  name: string;

  @Prop({ type: String, required: true })
  location: string;

  @Prop({ type: Number })
  capacity: number;

  @Prop({ type: [String] })
  amenities: string[];
  
  @Prop({ type: Boolean, default: false })
  isBooked: boolean;
}

// Mongoose requires this export for the schema factory
export const HallSchema = SchemaFactory.createForClass(HallBooking);