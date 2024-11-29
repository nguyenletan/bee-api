import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { HistorizedPointsModule } from './historized-points/historized-points.module';
import { EquipmentsModule } from './equipments/equipments.module';
import { ImprovementModule } from './improvement/improvement.module';
import { LightingSystemModule } from './lighting-system/lighting-system.module';
import { LightingSystemImprovementModule } from './lighting-system-improvement/lighting-system-improvement.module';
import { PCAF_EuropeanCommercialBuildingEmissionFactorModule } from './pcaf_european-commercial-building-emission-factor/pcaf_european-commercial-building-emission-factor.module';
import { SpacesModule } from './spaces/spaces.module';
import { PropertiesModule } from './properties/properties.module';
import { ElectricityConsumptionsModule } from './electricity-consumptions/electricity-consumptions.module';
import { HeatingConsumptionsModule } from './heating-consumptions/heating-consumptions.module';
import { CoolingSystemModule } from './cooling-system/cooling-system.module';
import { HeatingSystemModule } from './heating-system/heating-system.module';

@Module({
  imports: [
    UsersModule,
    HistorizedPointsModule,
    EquipmentsModule,
    ImprovementModule,
    LightingSystemModule,
    LightingSystemImprovementModule,
    PCAF_EuropeanCommercialBuildingEmissionFactorModule,
    SpacesModule,
    PropertiesModule,
    ElectricityConsumptionsModule,
    HeatingConsumptionsModule,
    CoolingSystemModule,
    HeatingSystemModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, FirebaseAuthStrategy],
})
export class AppModule {}
