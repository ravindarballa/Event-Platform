import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
// Standard: Import everything from the library alias
import { 
  PhotographyService, 
  Photography, 
  PhotographySchema 
} from '@event-platform/api-photo-data-access'; 
import { PhotographyController } from './photography.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Photography.name, schema: PhotographySchema }])
  ],
  controllers: [PhotographyController],
  providers: [PhotographyService],
})
export class PhotographyModule {}
