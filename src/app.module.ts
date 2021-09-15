import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { BuildingsModule } from './buildings/buildings.module';
import { PropertiesModule } from './properties/properties.module';
import { FloorsModule } from './floors/floors.module';
import { ZonesModule } from './zones/zones.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { HistorizedPointsModule } from './historized-points/historized-points.module';

@Module({
  imports: [
    UsersModule,
    PropertiesModule,
    BuildingsModule,
    FloorsModule,
    ZonesModule,
    HistorizedPointsModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, FirebaseAuthStrategy],
})
export class AppModule {}
