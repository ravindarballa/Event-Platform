import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { HallBooking } from './hall-booking.entity';

@Injectable()
export class HallBookingService {
  constructor(
    @InjectModel(HallBooking.name) 
    private hallBookingModel: Model<HallBooking>
  ) {}

  async findAll() {
    return await this.hallBookingModel.find().exec();
  }

  async findOne(id: string) {
    return await this.hallBookingModel.findById(id).exec();
  }

  async create(createHallBookingDto: any) {
    const created = new this.hallBookingModel(createHallBookingDto);
    return await created.save();
  }

  async update(id: string, updateHallBookingDto: any) {
    return await this.hallBookingModel.findByIdAndUpdate(
      id, 
      updateHallBookingDto, 
      { new: true }
    ).exec();
  }

  async remove(id: string) {
    return await this.hallBookingModel.findByIdAndDelete(id).exec();
  }
}