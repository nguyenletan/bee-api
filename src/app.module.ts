import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { PrismaService } from './prisma.service';
import { UsersModule } from './users/users.module';
import { FirebaseAuthStrategy } from './firebase/firebase-auth.strategy';
import { PCAF_EuropeanCommercialBuildingEmissionFactorModule } from './pcaf_european-commercial-building-emission-factor/pcaf_european-commercial-building-emission-factor.module';
import { SpacesModule } from './spaces/spaces.module';
import { PropertiesModule } from './properties/properties.module';
import { ElectricityConsumptionsModule } from './electricity-consumptions/electricity-consumptions.module';
import { HeatingConsumptionsModule } from './heating-consumptions/heating-consumptions.module';
import { CoolingSystemModule } from './cooling-system/cooling-system.module';
import { HeatingSystemModule } from './heating-system/heating-system.module';
import { EnvelopFacadeSystemModule } from './envelop-facade-system/envelop-facade-system.module';
import { SolarPanelSystemModule } from './solar-panel-system/solar-panel-system.module';
import { OperationHoursModule } from './operation-hours/operation-hours.module';

@Module({
  imports: [
    UsersModule,
    PCAF_EuropeanCommercialBuildingEmissionFactorModule,
    SpacesModule,
    PropertiesModule,
    ElectricityConsumptionsModule,
    HeatingConsumptionsModule,
    CoolingSystemModule,
    HeatingSystemModule,
    EnvelopFacadeSystemModule,
    SolarPanelSystemModule,
    OperationHoursModule,
  ],
  controllers: [AppController, UsersController],
  providers: [AppService, PrismaService, FirebaseAuthStrategy],
})
export class AppModule {}
