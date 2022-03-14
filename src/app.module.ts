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
import { EquipmentsModule } from './equipments/equipments.module';
import { ImprovementModule } from './improvement/improvement.module';
import { LightingSystemModule } from './lighting-system/lighting-system.module';


@Module({
  imports: [
    UsersModule,
    PropertiesModule,
    BuildingsModule,
    FloorsModule,
    ZonesModule,
    HistorizedPointsModule,
    EquipmentsModule,
    ImprovementModule,
    LightingSystemModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, FirebaseAuthStrategy],
})
export class AppModule {}
