import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

// Market Standard 2025: Use a Type Alias for the Document for better Type Safety
export type PhotographyDocument = Photography & Document;

@Schema({ 
  timestamps: true, 
  collection: 'photography' 
})
export class Photography {
  @Prop({ required: true, unique: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  location: string;

  @Prop({ type: Number, min: 0 })
  capacity: number;

  @Prop({ type: [String], default: [] })
  amenities: string[]; 
  
  @Prop({ default: false })
  isBooked: boolean;

  @Prop()
  imageUrl?: string; // Standard addition for photography modules
}

// FIXED: Renamed from HallSchema to PhotographySchema to match the domain
export const PhotographySchema = SchemaFactory.createForClass(Photography);
