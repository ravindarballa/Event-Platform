import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { 
  PhotographyService, 
  CreatePhotographyDto, 
  UpdatePhotographyDto 
} from '@event-platform/api-photo-data-access';

@Controller('photography')
export class PhotographyController {
  constructor(private readonly photographyService: PhotographyService) {}

  @Post()
  create(@Body() createPhotographyDto: CreatePhotographyDto) {
    return this.photographyService.create(createPhotographyDto);
  }

  @Get()
  findAll() {
    return this.photographyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.photographyService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePhotographyDto: UpdatePhotographyDto,
  ) {
    return this.photographyService.update(id, updatePhotographyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.photographyService.remove(id);
  }
}
