import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Photography } from './photography.entity';


@Injectable()
export class PhotographyService {
  constructor(@InjectModel(Photography.name) private hallModel: Model<Photography>) {}

  create(createDto: any) {
    return this.hallModel.create(createDto);
  }

  findAll() {
    return this.hallModel.find().exec();
  }

  // FIX: Added findOne
  findOne(id: string) {
    return this.hallModel.findById(id).exec();
  }

  // FIX: Added update
  update(id: string, updateDto: any) {
    return this.hallModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  // FIX: Added remove
  remove(id: string) {
    return this.hallModel.findByIdAndDelete(id).exec();
  }
}