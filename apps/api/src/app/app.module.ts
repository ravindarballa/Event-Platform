// apps/api/src/app/app.module.ts
import { Module, Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

/* Import Features from Libraries (2025 Standard) */
// Use the workspace aliases defined in your tsconfig.base.json
import { HallBookingModule } from '@event-platform/api-hall-feature';
import { PhotographyModule } from '@event-platform/api-photography-feature';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    // Database Connection with better error handling
    MongooseModule.forRootAsync({
      useFactory: () => {
        const logger = new Logger('MongoDB');
        const uri = 'mongodb://127.0.0.1:27017/event-platform';
        
        logger.log(`🔌 Attempting to connect to MongoDB at: ${uri}`);
        
        return {
          uri,
          serverSelectionTimeoutMS: 5000, // 5 second timeout
          socketTimeoutMS: 45000,
          connectTimeoutMS: 10000,
          retryWrites: true,
          retryReads: true,
          connectionFactory: (connection) => {
            // Log connection events
            connection.on('connected', () => {
              logger.log(`✅ MongoDB connected successfully!`);
              logger.log(`📊 Database: ${connection.db?.databaseName || 'unknown'}`);
            });
            
            connection.on('error', (error) => {
              logger.error(`❌ MongoDB connection error: ${error.message}`);
            });
            
            connection.on('disconnected', () => {
              logger.warn('⚠️ MongoDB disconnected');
            });
            
            // Check initial state after 1 second
            setTimeout(() => {
              const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
              const stateName = states[connection.readyState] || 'unknown';
              logger.log(`📡 MongoDB connection state: ${stateName} (${connection.readyState})`);
            }, 1000);
            
            return connection;
          }
        };
      }
    }),
    
    // Feature Modules (Pluggable Architecture)
    HallBookingModule, 
    PhotographyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}