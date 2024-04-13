import { Express } from 'express';
import redoc from 'redoc-express';
import { INestApplication } from '@nestjs/common';

export function setupRedoc(app: INestApplication<any>) {
  const redocOptions = {
    title: 'BEE API',
    version: '1.0',
    specUrl: '/api-json',
  };

  app.use('/docs', redoc(redocOptions));
}
