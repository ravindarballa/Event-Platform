import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { HallBookingService, HallBooking, HallSchema } from '@event-platform/api-hall-data-access';
import { HallBookingController } from './hall-booking.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HallBooking.name, schema: HallSchema }])
  ],
  controllers: [HallBookingController],
  providers: [HallBookingService],
})
export class HallBookingModule {}
