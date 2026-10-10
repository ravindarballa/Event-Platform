import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { HallBookingService } from '@event-platform/api-hall-data-access';

@Controller('hall-booking')
export class HallBookingController {
  constructor(private readonly hallBookingService: HallBookingService) {}

  @Get()
  findAll() {
    return this.hallBookingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hallBookingService.findOne(id);
  }

  @Post()
  create(@Body() createHallBookingDto: any) {
    return this.hallBookingService.create(createHallBookingDto);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateHallBookingDto: any) {
    return this.hallBookingService.update(id, updateHallBookingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.hallBookingService.remove(id);
  }
}