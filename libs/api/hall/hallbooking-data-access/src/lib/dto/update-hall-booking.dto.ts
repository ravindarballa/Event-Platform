import { PartialType } from '@nestjs/mapped-types';
import { CreateHallBookingDto } from './create-hall-booking.dto';

export class UpdateHallBookingDto extends PartialType(CreateHallBookingDto) {}
