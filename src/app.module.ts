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
import { LightingSystemImprovementModule } from './lighting-system-improvement/lighting-system-improvement.module';
import { ProgressMockDataModule } from './progress-mock-data/progress-mock-data.module';
import { PCAF_EuropeanCommercialBuildingEmissionFactorModule } from './pcaf_european-commercial-building-emission-factor/pcaf_european-commercial-building-emission-factor.module';
import { BcaModule } from './bca/bca.module';

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
    LightingSystemImprovementModule,
    ProgressMockDataModule,
    PCAF_EuropeanCommercialBuildingEmissionFactorModule,
    BcaModule
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, FirebaseAuthStrategy],
})
export class AppModule {}
