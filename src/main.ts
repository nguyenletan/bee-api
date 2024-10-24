import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { json, urlencoded } from 'express';
import { setupRedoc } from './redoc.middleware';

async function bootstrap() {
  const allowList = [
    // 'http://localhost:3000',
    // 'http://localhost:4000',
    // 'https://bee-mvp.vercel.app',
    // 'https://bee-mvp.vercel.app/',
    // 'https://bee-poc.netlify.app',
    // 'https://bee-poc.netlify.app/',
  ];
  // const corsOptionsDelegate = function (req, callback) {
  //   let corsOptions;
  //   if (allowlist.indexOf(req.header('Origin')) !== -1) {
  //     corsOptions = { origin: true }; // reflect (enable) the requested origin in the CORS response
  //   } else {
  //     corsOptions = { origin: false }; // disable CORS for this request
  //   }
  //   callback(null, corsOptions); // callback expects two parameters: error and options
  // };

  const app = await NestFactory.create(AppModule);
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));
  app.enableCors({
    // origin: function (origin, callback) {
    //   console.log(origin);
    //   console.log(allowList);
    //   callback(null, true);
    //   // if (origin === undefined || allowList.indexOf(origin) !== -1) {
    //   //   console.log('allowed cors for:', origin);
    //   //   callback(null, true);
    //   // } else {
    //   //   console.log('blocked cors for:', origin);
    //   //   callback(new Error('Not allowed by CORS'));
    //   // }
    // },
    origin: '*',
    credentials: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  const config = new DocumentBuilder()
    .setTitle('BEE API')
    .setDescription('The BEE API description')
    .setVersion('1.0')
    .addTag('BEE')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  setupRedoc(app);
  BigInt.prototype['toJSON'] = function () {
    const int = Number.parseInt(this.toString());
    return int ?? this.toString();
  };
  //await app.listen(4000);
  const PORT = process.env.PORT || 4000;
  await app.listen(PORT);
}
bootstrap();
