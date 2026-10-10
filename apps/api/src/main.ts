// apps/api/src/main.ts
import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app/app.module';
import { getConnectionToken } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  
  logger.log('='.repeat(50));
  logger.log('🚀 Starting Event Platform API Server...');
  logger.log('='.repeat(50));

  try {
    // 1. Create the application with verbose logging
    logger.log('Creating NestJS application instance...');
    const app = await NestFactory.create(AppModule, {
      logger: ['error', 'warn', 'log', 'debug'], // Enable all log levels
      abortOnError: false, // Don't crash on initialization errors
    });
    
    logger.log('NestJS application created successfully');

    // 2. Configure Global Settings
    const globalPrefix = 'api';
    app.setGlobalPrefix(globalPrefix);
    logger.log(`Global API prefix set to: /${globalPrefix}`);

    // 3. Add a simple health endpoint (works even if MongoDB fails)
    app.getHttpAdapter().get('/', (req, res) => {
      res.json({
        message: 'Event Platform API',
        status: 'running',
        documentation: `http://localhost:${process.env.PORT || 3000}/api`,
        timestamp: new Date().toISOString()
      });
    });
    
    app.getHttpAdapter().get('/health', (req, res) => {
      try {
        const connection = app.get<Connection>(getConnectionToken());
        res.json({
          status: 'OK',
          server: 'running',
          timestamp: new Date().toISOString(),
          mongoDB: connection.readyState === 1 ? 'connected' : 'disconnected',
          mongoDBState: connection.readyState,
          mongoDBStateName: ['disconnected', 'connected', 'connecting', 'disconnecting'][connection.readyState]
        });
      } catch (error) {
        res.json({
          status: 'WARNING',
          server: 'running',
          timestamp: new Date().toISOString(),
          mongoDB: 'unknown',
          error: 'Cannot check MongoDB status'
        });
      }
    });

    // 4. Define the Port
    const port = process.env.PORT || 3000;
    logger.log(`Server will listen on port: ${port}`);

    // 5. Check MongoDB status before starting
    logger.log('Checking MongoDB connection status...');
    try {
      const connection = app.get<Connection>(getConnectionToken());
      const states = ['disconnected', 'connected', 'connecting', 'disconnecting'];
      const mongoState = states[connection.readyState] || 'unknown';
      logger.log(`MongoDB initial state: ${mongoState} (${connection.readyState})`);
      
      if (connection.readyState !== 1) {
        logger.warn(`⚠️ MongoDB is not connected. The app will start anyway.`);
        logger.warn(`   Some database features may not work until MongoDB connects.`);
      }
    } catch (error) {
      logger.error(`Failed to check MongoDB: ${error.message}`);
    }

    // 6. Start Listening
    logger.log(`Starting HTTP server...`);
    await app.listen(port, '0.0.0.0');
    
    logger.log('='.repeat(50));
    logger.log(`✅ SUCCESS! Event Platform API is running!`);
    logger.log('='.repeat(50));
    logger.log(`📡 Local URL:    http://localhost:${port}/${globalPrefix}`);
    logger.log(`🌐 Network URL:  http://0.0.0.0:${port}/${globalPrefix}`);
    logger.log(`🔍 Health check: http://localhost:${port}/health`);
    logger.log(`🏠 Home page:    http://localhost:${port}/`);
    logger.log('='.repeat(50));
    logger.log(`Press Ctrl+C to stop the server`);
    logger.log('='.repeat(50));

  } catch (error) {
    // 7. Catch and log any startup errors
    logger.error('='.repeat(50));
    logger.error('❌ CRITICAL: Failed to start the server!');
    logger.error('='.repeat(50));
    logger.error(`Error: ${error.message}`);
    logger.error(`Stack trace: ${error.stack}`);
    logger.error('='.repeat(50));
    logger.error('Possible solutions:');
    logger.error('1. Check if MongoDB is running: netstat -ano | findstr :27017');
    logger.error('2. Try: docker run -d -p 27017:27017 --name mongodb mongo');
    logger.error('3. Check if port 3000 is already in use');
    logger.error('='.repeat(50));
    
    // Explicitly exit so Nx doesn't try to restart a broken process indefinitely
    process.exit(1);
  }
}

bootstrap();