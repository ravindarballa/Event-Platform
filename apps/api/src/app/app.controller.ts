// apps/api/src/app/app.controller.ts
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  @Get()
  getHello() {
    return {
      message: 'Welcome to Event Platform API',
      status: 'operational',
      database: this.connection.readyState === 1 ? 'connected' : 'disconnected',
      endpoints: {
        hall: '/api/hall',
        photography: '/api/photography',
        health: '/health'
      }
    };
  }
}