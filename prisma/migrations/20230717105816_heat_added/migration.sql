-- CreateTable
CREATE TABLE "AuthType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "description" TEXT,

    CONSTRAINT "authtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AverageOperatingHours" (
    "id" SERIAL NOT NULL,
    "propId" INTEGER,
    "weekly" DOUBLE PRECISION,
    "monthly" DOUBLE PRECISION,
    "annually" DOUBLE PRECISION,
    "mondayStart" VARCHAR,
    "mondayEnd" VARCHAR,
    "tuesdayStart" VARCHAR,
    "tuesdayEnd" VARCHAR,
    "wednesdayStart" VARCHAR,
    "wednesdayEnd" VARCHAR,
    "thursdayStart" VARCHAR,
    "thursdayEnd" VARCHAR,
    "fridayStart" VARCHAR,
    "fridayEnd" VARCHAR,
    "saturdayStart" VARCHAR,
    "saturdayEnd" VARCHAR,
    "sundayStart" VARCHAR,
    "sundayEnd" VARCHAR,
    "publicHolidayStart" VARCHAR,
    "publicHolidayEnd" VARCHAR,

    CONSTRAINT "averageoperatinghours_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Building" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "numberOfFloorAboveGroundLvl" INTEGER,
    "numberOfFloorBelowGroundLvl" INTEGER,
    "buildingMajorOrientationId" INTEGER NOT NULL,
    "averageInternalFloorToCeilingHeight" DOUBLE PRECISION,
    "storeysAboveGround" INTEGER,
    "storeysBelowGround" INTEGER,
    "averageInternalFloorToCeilingHeightUnit" VARCHAR,

    CONSTRAINT "building_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BuildingMajorOrientation" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "buildingmajororientation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CO2EmissionRate" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER,
    "country" VARCHAR,
    "state" VARCHAR,
    "city" VARCHAR,
    "gridEmissionRate" DOUBLE PRECISION,
    "electricitySupplierInformationId" INTEGER NOT NULL,

    CONSTRAINT "co2emissionrate_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chiller" (
    "id" SERIAL NOT NULL,
    "chillerTypeId" INTEGER,
    "compressorTypeId" INTEGER,
    "capacity" DOUBLE PRECISION,
    "refrigerantTypeId" INTEGER,
    "manufacturerId" INTEGER,
    "modelId" INTEGER,
    "chillerEnergySourceTypeId" INTEGER,
    "coolingSystemId" INTEGER NOT NULL,

    CONSTRAINT "chiller_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChillerEnergySource" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "coolingsystemenergysource_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ChillerType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "chillertype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClimateControl" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "climatecontrol_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CompressorType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "compressortype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoolingHistorizedPoint" (
    "id" SERIAL NOT NULL,
    "pointId" INTEGER,
    "value" DOUBLE PRECISION,
    "unit" VARCHAR,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "propId" INTEGER,

    CONSTRAINT "coolinghistorizedpoint_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoolingSystem" (
    "id" SERIAL NOT NULL,
    "estimatedCoolingSystemEfficiency" DOUBLE PRECISION,
    "propId" INTEGER,
    "estimatedCoolingLoad" DOUBLE PRECISION,
    "percentageCooledFloorArea" DOUBLE PRECISION,
    "coolingSystemTypeId" INTEGER,

    CONSTRAINT "coolingsystem_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CoolingSystemType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "coolingsystemtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricityConsumption" (
    "id" SERIAL NOT NULL,
    "electricitySupplierId" INTEGER,
    "monthlyCost" DOUBLE PRECISION NOT NULL,
    "monthlyValue" DOUBLE PRECISION NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "propId" INTEGER,

    CONSTRAINT "electricityconsumption_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricitySupplierAPI" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER,
    "apiUrl" VARCHAR,
    "apiKey" VARCHAR,
    "apiFormat" VARCHAR,
    "electricitySupplierInformationId" INTEGER NOT NULL,

    CONSTRAINT "electricitysupplierapi_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricitySupplierAreas" (
    "id" SERIAL NOT NULL,
    "supplierId" VARCHAR NOT NULL,
    "countryService" VARCHAR,
    "stateService" VARCHAR,
    "cityService" VARCHAR,
    "electricitySupplierInformationId" INTEGER NOT NULL,

    CONSTRAINT "electricitysupplierareas_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ElectricitySupplierInformation" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR,
    "apiKey" VARCHAR,

    CONSTRAINT "electricitysupplierinformation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EquipmentDetail" (
    "id" SERIAL NOT NULL,
    "equipmentId" INTEGER NOT NULL,
    "manufacturer" VARCHAR NOT NULL,
    "model" VARCHAR NOT NULL,
    "capacity" DOUBLE PRECISION,
    "installDate" DATE NOT NULL,
    "commissioned" DATE NOT NULL,
    "depreciationMode" VARCHAR NOT NULL,
    "estimatedUsefulLife" INTEGER,
    "initialAssetCost" DOUBLE PRECISION NOT NULL,
    "refrigerantTypeId" INTEGER,
    "flowTypeId" INTEGER,
    "maxHead" DOUBLE PRECISION,
    "maxFlowRate" DOUBLE PRECISION,
    "maxPower" DOUBLE PRECISION,
    "ratedCapacity" DOUBLE PRECISION,
    "standardAirFlowCoilFaceVelocity" DOUBLE PRECISION,
    "requiredFlowRate" DOUBLE PRECISION,
    "nominalRPM" DOUBLE PRECISION,
    "maxStaticPressure" DOUBLE PRECISION,
    "flowRateAtMinStaticPressure" DOUBLE PRECISION,
    "sonesAtMinStaticPressure" DOUBLE PRECISION,
    "maxStaticPressure2" DOUBLE PRECISION,
    "flowRateAtMinStaticPressure2" DOUBLE PRECISION,
    "sonesAtMinStaticPressure2" DOUBLE PRECISION,
    "location" VARCHAR,
    "imageUrl" VARCHAR,

    CONSTRAINT "equipmentdetail_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Equipments" (
    "id" SERIAL NOT NULL,
    "equipId" VARCHAR,
    "dis" VARCHAR,
    "equipTypeId" INTEGER,
    "isEquipmentAsset" BOOLEAN,
    "propertyId" INTEGER,
    "parentId" INTEGER,
    "coolingSystemId" INTEGER,
    "heatingSystemId" INTEGER,
    "lightingSystemId" INTEGER,
    "spaceUsageId" INTEGER,
    "mechanicalVentilationSystemId" INTEGER,

    CONSTRAINT "equipments_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExternalEnvelopeSubSystem" (
    "id" SERIAL NOT NULL,
    "externalWindowToWallRatio" DOUBLE PRECISION,
    "externalRoofInsulationTypeId" INTEGER,
    "externalWallInsulationTypeId" INTEGER,
    "externalWindowInsulationTypeId" INTEGER,
    "groundInsulationTypeId" INTEGER,
    "floorInsulationTypeId" INTEGER,
    "roofInsulationTypeId" INTEGER,
    "floorName" VARCHAR,
    "zoneName" VARCHAR,
    "propId" INTEGER,
    "externalGroundInsulationTypeId" INTEGER,

    CONSTRAINT "externalenvelopesubsystem_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FanType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "fantype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Floor" (
    "id" SERIAL NOT NULL,
    "buildingId" INTEGER NOT NULL,
    "name" VARCHAR NOT NULL,
    "number" VARCHAR,
    "createdAt" DATE,
    "updatedAt" DATE,

    CONSTRAINT "floor_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GroundInsulationType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "uValue" DOUBLE PRECISION,
    "type" VARCHAR,

    CONSTRAINT "groundinsulationtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Heater" (
    "id" SERIAL NOT NULL,
    "heaterTypeId" INTEGER,
    "capacity" DOUBLE PRECISION,
    "manufacturerId" INTEGER,
    "modelId" INTEGER,
    "heaterEnergySourceId" INTEGER,
    "heatingSystemId" INTEGER,

    CONSTRAINT "heater_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeaterEnergySource" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "heatingsystemenergysource_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeaterType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "heatertype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatingHistorizedPoint" (
    "id" SERIAL NOT NULL,
    "pointId" INTEGER,
    "value" DOUBLE PRECISION,
    "unit" VARCHAR,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "propId" INTEGER,

    CONSTRAINT "heatinghistorizedpoint_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatingSystem" (
    "id" SERIAL NOT NULL,
    "propId" INTEGER,
    "heatingSystemTypeId" INTEGER,
    "estimatedHeatingSystemEfficiency" DOUBLE PRECISION,
    "estimatedHeatingLoad" DOUBLE PRECISION,
    "percentageHeatedFloorArea" DOUBLE PRECISION,

    CONSTRAINT "heatingventilationairconditioning_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatingSystemType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "heatingsystemtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LightingFittingType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "fittingtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LightingHistorizedPoint" (
    "id" SERIAL NOT NULL,
    "propId" INTEGER,
    "value" DOUBLE PRECISION,
    "unit" VARCHAR,
    "createdAt" TIMESTAMP(6),
    "pointId" INTEGER,

    CONSTRAINT "lightinghistorizedpoint_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LightingSystem" (
    "id" SERIAL NOT NULL,
    "estimatedLightingLoad" DOUBLE PRECISION,
    "lightingFittingTypeId" INTEGER,
    "percentageOfFittingTypeUsed" DOUBLE PRECISION,
    "propId" INTEGER,
    "numberOfBulbs" INTEGER,
    "wattRatingOfBulb" INTEGER,
    "lumensOfBulb" DOUBLE PRECISION,
    "title" VARCHAR,
    "numberOfDaysUsedPerWeek" INTEGER,
    "numberOfHoursUsedPerDay" INTEGER,

    CONSTRAINT "lightinginformationsection_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LightingSystemImprovement" (
    "id" SERIAL NOT NULL,
    "userExternalId" TEXT NOT NULL,
    "lightSystemId" INTEGER,
    "numberOfBulbs" INTEGER,
    "wattRating" DOUBLE PRECISION,
    "lumenRating" DOUBLE PRECISION,
    "costOfEachBulb" DOUBLE PRECISION,
    "numberOfDaysPerWeek" INTEGER,
    "numberOfHoursPerDay" INTEGER,

    CONSTRAINT "LightingSystemImprovement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MechanicalVentilationHistorizedPoint" (
    "id" SERIAL NOT NULL,
    "pointId" INTEGER,
    "value" DOUBLE PRECISION,
    "unit" VARCHAR,
    "createdAt" TIMESTAMP(6),
    "propId" INTEGER,

    CONSTRAINT "mechanicalventilationhistorizedpoint_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MechanicalVentilationSystem" (
    "id" SERIAL NOT NULL,
    "fantTypeId" INTEGER NOT NULL,
    "hasHeatRecovery" BOOLEAN NOT NULL,
    "spaceUsageId" INTEGER NOT NULL,

    CONSTRAINT "mechanicalventilation_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MountingType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "mountingtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OverallHistorizedPoint" (
    "id" SERIAL NOT NULL,
    "propId" INTEGER,
    "value" DOUBLE PRECISION,
    "unit" VARCHAR,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "overallhistorizedpoint_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PVSystemType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "pvsystemtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PVTechChoice" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "pvtechchoice_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Points" (
    "id" SERIAL NOT NULL,
    "equipId" INTEGER NOT NULL,
    "currentValue" DOUBLE PRECISION,
    "unit" VARCHAR,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "currentStatus" INTEGER,
    "currentError" INTEGER,
    "pointFunctionId" INTEGER,
    "dis" VARCHAR,

    CONSTRAINT "points_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property" (
    "id" SERIAL NOT NULL,
    "streetAddress" VARCHAR NOT NULL,
    "postCode" CHAR(10) NOT NULL,
    "city" VARCHAR NOT NULL,
    "state" VARCHAR,
    "region" VARCHAR,
    "countryCode" VARCHAR,
    "grossFloorArea" DOUBLE PRECISION NOT NULL,
    "completionYear" INTEGER,
    "majorOrientationId" INTEGER,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "buildingId" INTEGER,
    "floorId" INTEGER,
    "zoneId" INTEGER,
    "sustainabilityRatingSchemeId" INTEGER,
    "sustainabilityRatingId" INTEGER,
    "latitude" DECIMAL,
    "longitude" DECIMAL,
    "grossInteriorArea" DOUBLE PRECISION,
    "netUsableArea" DOUBLE PRECISION,
    "useTypeId" INTEGER,
    "photo" TEXT,
    "grossInteriorAreaUnit" VARCHAR,
    "netUsableAreaUnit" VARCHAR,
    "hasMajorRefurbishmentOrExtensionsDone" BOOLEAN,
    "latestYearForRefurbishmentOrExtension" INTEGER,
    "statusId" INTEGER DEFAULT 2,
    "streetNumber" VARCHAR,
    "streetName" VARCHAR,
    "editedBy" VARCHAR,

    CONSTRAINT "property_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PropertyUser" (
    "id" SERIAL NOT NULL,
    "userAuthUID" VARCHAR NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "buildinguser_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Property_UseType" (
    "id" SERIAL NOT NULL,
    "useTypeId" INTEGER NOT NULL,
    "propertyId" INTEGER NOT NULL,

    CONSTRAINT "property_propertytype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_CoolingLoadRuleOfThumb" (
    "id" SERIAL NOT NULL,
    "building_type" CHAR(50) NOT NULL,
    "use" TEXT NOT NULL,
    "people" DECIMAL NOT NULL,
    "lighting" DECIMAL NOT NULL,
    "equipment" DECIMAL NOT NULL,

    CONSTRAINT "cooling_load_rule_of_thumb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_CorrespondingEfficiencyRatio" (
    "id" SERIAL NOT NULL,
    "type" CHAR(50) NOT NULL,
    "cooling" DECIMAL NOT NULL,
    "heating" DECIMAL NOT NULL,
    "direct_electric" DECIMAL NOT NULL,

    CONSTRAINT "corresponding_efficiency_ratio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_Country" (
    "id" SERIAL NOT NULL,
    "code" CHAR(2) NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "country_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_CountryGridEmissions" (
    "id" SERIAL NOT NULL,
    "country_code" CHAR(10) NOT NULL,
    "co2_emissions" DECIMAL NOT NULL,

    CONSTRAINT "countrygridemissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_EfficiencyRatio" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "value" DOUBLE PRECISION,
    "description" TEXT,

    CONSTRAINT "r_efficiencyratio_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_EquipmentTypes" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "parentId" INTEGER,

    CONSTRAINT "r_equipmenttypes_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_FlowType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "r_flowtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_HeatingLoadRuleOfThumb" (
    "id" SERIAL NOT NULL,
    "building_type" CHAR(50) NOT NULL,
    "use" TEXT NOT NULL,
    "heating_tbc" DECIMAL NOT NULL,

    CONSTRAINT "heating_load_rule_of_thumb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_LightFittingEfficacy" (
    "id" SERIAL NOT NULL,
    "light_fitting" TEXT NOT NULL,
    "efficacy" DECIMAL NOT NULL,

    CONSTRAINT "light_fitting_efficacy_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_LightingLoadRuleOfThumb" (
    "id" SERIAL NOT NULL,
    "building_type" CHAR(50) NOT NULL,
    "use" TEXT NOT NULL,
    "lighting_load_tbc" DECIMAL NOT NULL,

    CONSTRAINT "lighting_load_rule_of_thumb_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_WallTypeUValue" (
    "id" SERIAL NOT NULL,
    "wall_type" TEXT NOT NULL,
    "u_value" DECIMAL NOT NULL,

    CONSTRAINT "wall_type_u_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "R_WindowTypeUValue" (
    "id" SERIAL NOT NULL,
    "window_type" TEXT NOT NULL,
    "u_value" DECIMAL NOT NULL,
    "shading_coefficient" DECIMAL NOT NULL,

    CONSTRAINT "window_type_u_value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RefrigerantType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "refrigeranttype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoofInsulationType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "uValue" DOUBLE PRECISION,
    "description" TEXT,

    CONSTRAINT "roofinsulationtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoofType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "description" TEXT,

    CONSTRAINT "rooftype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolarPanelSystem" (
    "id" SERIAL NOT NULL,
    "installedCapacity" DOUBLE PRECISION,
    "systemLoss" DOUBLE PRECISION,
    "inclineAngle" DOUBLE PRECISION,
    "trackingTypeId" INTEGER,
    "pvTechChoiceId" INTEGER,
    "pvSystemTypeId" INTEGER,
    "renewableEnergySystem" INTEGER,
    "propId" INTEGER NOT NULL,
    "mountingTypeId" INTEGER,
    "orientationAngle" DOUBLE PRECISION,

    CONSTRAINT "solarpanelsystem_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceUsage" (
    "id" SERIAL NOT NULL,
    "usageTypeId" INTEGER NOT NULL,
    "usagePercentage" INTEGER,
    "climateControlId" INTEGER,
    "propId" INTEGER,
    "title" VARCHAR,
    "fanTypeId" INTEGER,
    "hasReheatRecovery" BOOLEAN,

    CONSTRAINT "spaceusage_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SpaceUsageType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "countryCode" VARCHAR,
    "coolingLoad" DOUBLE PRECISION,
    "heatingLoad" DOUBLE PRECISION,
    "mvLoad" DOUBLE PRECISION,
    "lightingLoad" DOUBLE PRECISION,

    CONSTRAINT "spaceusagetype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Status" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,

    CONSTRAINT "status_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SustainabilityRating" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,
    "SustainabilityRatingSchemaId" INTEGER NOT NULL,

    CONSTRAINT "sustainabilityrating_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SustainabilityRatingScheme" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "sustainabilityratingscheme_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrackingType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "trackingtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UseType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,
    "description" TEXT,

    CONSTRAINT "buildingtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR,
    "status" VARCHAR,
    "userTypeId" INTEGER,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(6),
    "authTypeId" INTEGER,
    "externalUID" VARCHAR NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserDetail" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR NOT NULL,
    "firstName" VARCHAR,
    "lastName" VARCHAR,
    "userId" INTEGER,
    "createdAt" TIMESTAMP(6),
    "updatedAt" TIMESTAMP(6),

    CONSTRAINT "UserDetail_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserTracking" (
    "id" SERIAL NOT NULL,
    "externalId" VARCHAR,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "pageName" VARCHAR,

    CONSTRAINT "usertracking_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR NOT NULL,

    CONSTRAINT "UserType_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WallInsulationType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "uValue" DOUBLE PRECISION,
    "description" TEXT,

    CONSTRAINT "wallinsulationtypeusage_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WindowInsulationType" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "uValue" DOUBLE PRECISION,
    "shadingCoefficient" DOUBLE PRECISION,
    "description" TEXT,

    CONSTRAINT "windowinsulationtype_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Zone" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR,
    "floorId" INTEGER,
    "buildingId" INTEGER,

    CONSTRAINT "zone_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "nc_evolutions" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "titleDown" VARCHAR(255),
    "description" VARCHAR(255),
    "batch" INTEGER,
    "checksum" VARCHAR(255),
    "status" INTEGER,
    "created" TIMESTAMPTZ(6),
    "created_at" TIMESTAMPTZ(6),
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "nc_evolutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatConsumption" (
    "id" SERIAL NOT NULL,
    "heatSupplierId" INTEGER,
    "monthlyCost" DOUBLE PRECISION NOT NULL,
    "monthlyValue" DOUBLE PRECISION NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "propId" INTEGER,
    "heattype" INTEGER NOT NULL,

    CONSTRAINT "HeatConsumption_pkey" PRIMARY KEY ("id","heattype")
);

-- CreateTable
CREATE TABLE "HeatSupplierAPI" (
    "id" SERIAL NOT NULL,
    "supplierId" INTEGER,
    "apiUrl" VARCHAR,
    "apiKey" VARCHAR,
    "apiFormat" VARCHAR,
    "heatSupplierInformationId" INTEGER NOT NULL,

    CONSTRAINT "heatsupplierapi_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatSupplierAreas" (
    "id" SERIAL NOT NULL,
    "supplierId" VARCHAR NOT NULL,
    "countryService" VARCHAR,
    "stateService" VARCHAR,
    "cityService" VARCHAR,
    "heatSupplierInformationId" INTEGER NOT NULL,

    CONSTRAINT "heatsupplierareas_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HeatSupplierInformation" (
    "id" SERIAL NOT NULL,
    "companyName" VARCHAR,
    "apiKey" VARCHAR,

    CONSTRAINT "heatsupplierinformation_pk" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "buildingmajororientation_name_uindex" ON "BuildingMajorOrientation"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coolingsystemenergysource_name_uindex" ON "ChillerEnergySource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "coolingsystemtype_name_uindex" ON "CoolingSystemType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fantype_name_uindex" ON "FanType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "heatingsystemenergysource_name_uindex" ON "HeaterEnergySource"("name");

-- CreateIndex
CREATE UNIQUE INDEX "heatingsystemtype_name_uindex" ON "HeatingSystemType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fittingtype_name_uindex" ON "LightingFittingType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "country_code_uindex" ON "R_Country"("code");

-- CreateIndex
CREATE UNIQUE INDEX "country_name_uindex" ON "R_Country"("name");

-- CreateIndex
CREATE UNIQUE INDEX "r_equipmenttypes_name_uindex" ON "R_EquipmentTypes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "sustainabilityratingscheme_name_uindex" ON "SustainabilityRatingScheme"("name");

-- CreateIndex
CREATE UNIQUE INDEX "buildingtype_name_uindex" ON "UseType"("name");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_uindex" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "user_externaluid_uindex" ON "User"("externalUID");

-- AddForeignKey
ALTER TABLE "AverageOperatingHours" ADD CONSTRAINT "averageoperatinghours_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CO2EmissionRate" ADD CONSTRAINT "co2emissionrate_electricitysupplierinformation_id_fk" FOREIGN KEY ("electricitySupplierInformationId") REFERENCES "ElectricitySupplierInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Chiller" ADD CONSTRAINT "chiller_chillerenergysource_id_fk" FOREIGN KEY ("chillerEnergySourceTypeId") REFERENCES "ChillerEnergySource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chiller" ADD CONSTRAINT "chiller_chillertype_id_fk" FOREIGN KEY ("chillerTypeId") REFERENCES "ChillerType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chiller" ADD CONSTRAINT "chiller_compressortype_id_fk" FOREIGN KEY ("compressorTypeId") REFERENCES "CompressorType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chiller" ADD CONSTRAINT "chiller_coolingsystem_id_fk" FOREIGN KEY ("coolingSystemId") REFERENCES "CoolingSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chiller" ADD CONSTRAINT "chiller_refrigeranttype_id_fk" FOREIGN KEY ("refrigerantTypeId") REFERENCES "RefrigerantType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoolingHistorizedPoint" ADD CONSTRAINT "coolinghistorizedpoint_points_id_fk" FOREIGN KEY ("pointId") REFERENCES "Points"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "CoolingHistorizedPoint" ADD CONSTRAINT "coolinghistorizedpoint_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "CoolingSystem" ADD CONSTRAINT "coolingsystem_coolingsystemtype_id_fk" FOREIGN KEY ("coolingSystemTypeId") REFERENCES "CoolingSystemType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CoolingSystem" ADD CONSTRAINT "coolingsystem_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricityConsumption" ADD CONSTRAINT "electricityconsumption_electricitysupplierinformation_id_fk" FOREIGN KEY ("electricitySupplierId") REFERENCES "ElectricitySupplierInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricityConsumption" ADD CONSTRAINT "electricityconsumption_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ElectricitySupplierAPI" ADD CONSTRAINT "electricitysupplierapi_electricitysupplierinformation_id_fk" FOREIGN KEY ("electricitySupplierInformationId") REFERENCES "ElectricitySupplierInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ElectricitySupplierAreas" ADD CONSTRAINT "electricitysupplierareas_electricitysupplierinformation_id_fk" FOREIGN KEY ("electricitySupplierInformationId") REFERENCES "ElectricitySupplierInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "EquipmentDetail" ADD CONSTRAINT "equipmentdetail_equipments_id_fk" FOREIGN KEY ("equipmentId") REFERENCES "Equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentDetail" ADD CONSTRAINT "equipmentdetail_r_flowtype_id_fk" FOREIGN KEY ("flowTypeId") REFERENCES "R_FlowType"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "EquipmentDetail" ADD CONSTRAINT "equipmentdetail_refrigeranttype_id_fk" FOREIGN KEY ("refrigerantTypeId") REFERENCES "RefrigerantType"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "equipments_coolingsystem_id_fk" FOREIGN KEY ("coolingSystemId") REFERENCES "CoolingSystem"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "equipments_heatingsystem_id_fk" FOREIGN KEY ("heatingSystemId") REFERENCES "HeatingSystem"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "equipments_lightingsystem_id_fk" FOREIGN KEY ("lightingSystemId") REFERENCES "LightingSystem"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "equipments_mechanicalventilation_id_fk" FOREIGN KEY ("mechanicalVentilationSystemId") REFERENCES "MechanicalVentilationSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "equipments_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "equipments_r_equipmenttypes_id_fk" FOREIGN KEY ("equipTypeId") REFERENCES "R_EquipmentTypes"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Equipments" ADD CONSTRAINT "equipments_spaceusage_id_fk" FOREIGN KEY ("spaceUsageId") REFERENCES "SpaceUsage"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" ADD CONSTRAINT "externalenvelopesubsystem_groundinsulationtype_id_fk" FOREIGN KEY ("externalGroundInsulationTypeId") REFERENCES "GroundInsulationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" ADD CONSTRAINT "externalenvelopesubsystem_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" ADD CONSTRAINT "externalenvelopesubsystem_roofinsulationtype_id_fk_2" FOREIGN KEY ("externalRoofInsulationTypeId") REFERENCES "RoofInsulationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" ADD CONSTRAINT "externalenvelopesubsystem_rooftype_id_fk" FOREIGN KEY ("roofInsulationTypeId") REFERENCES "RoofType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" ADD CONSTRAINT "externalenvelopesubsystem_wallinsulationtype_id_fk" FOREIGN KEY ("externalWallInsulationTypeId") REFERENCES "WallInsulationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" ADD CONSTRAINT "externalenvelopesubsystem_windowinsulationtype_id_fk" FOREIGN KEY ("externalWindowInsulationTypeId") REFERENCES "WindowInsulationType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Floor" ADD CONSTRAINT "floor_building_id_fk" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heater" ADD CONSTRAINT "heater_heaterenergysource_id_fk" FOREIGN KEY ("heaterEnergySourceId") REFERENCES "HeaterEnergySource"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heater" ADD CONSTRAINT "heater_heatertype_id_fk" FOREIGN KEY ("heaterTypeId") REFERENCES "HeaterType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Heater" ADD CONSTRAINT "heater_heatingsystem_id_fk" FOREIGN KEY ("heatingSystemId") REFERENCES "HeatingSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeatingHistorizedPoint" ADD CONSTRAINT "heatinghistorizedpoint_points_id_fk" FOREIGN KEY ("pointId") REFERENCES "Points"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "HeatingHistorizedPoint" ADD CONSTRAINT "heatinghistorizedpoint_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "HeatingSystem" ADD CONSTRAINT "heatingsystem_heatingsystemtype_id_fk" FOREIGN KEY ("heatingSystemTypeId") REFERENCES "HeatingSystemType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeatingSystem" ADD CONSTRAINT "heatingsystem_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LightingHistorizedPoint" ADD CONSTRAINT "lightinghistorizedpoint_points_id_fk" FOREIGN KEY ("pointId") REFERENCES "Points"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LightingHistorizedPoint" ADD CONSTRAINT "lightinghistorizedpoint_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "LightingSystem" ADD CONSTRAINT "lightingfittingsystem_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LightingSystem" ADD CONSTRAINT "lightinginformationsection_fittingtype_id_fk" FOREIGN KEY ("lightingFittingTypeId") REFERENCES "LightingFittingType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LightingSystemImprovement" ADD CONSTRAINT "lightingsystemimprovement_lightingsystem_id_fk" FOREIGN KEY ("lightSystemId") REFERENCES "LightingSystem"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MechanicalVentilationHistorizedPoint" ADD CONSTRAINT "mechanicalventilationhistorizedpoint_points_id_fk" FOREIGN KEY ("pointId") REFERENCES "Points"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "MechanicalVentilationHistorizedPoint" ADD CONSTRAINT "mechanicalventilationhistorizedpoint_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "OverallHistorizedPoint" ADD CONSTRAINT "overallhistorizedpoint_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE SET NULL;

-- AddForeignKey
ALTER TABLE "Points" ADD CONSTRAINT "points_equipments_id_fk" FOREIGN KEY ("equipId") REFERENCES "Equipments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "property_building_id_fk" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "property_buildingmajororientation _id_fk" FOREIGN KEY ("majorOrientationId") REFERENCES "BuildingMajorOrientation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "property_floor_id_fk" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "property_status_id_fk" FOREIGN KEY ("statusId") REFERENCES "Status"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "property_user_externaluid_fk" FOREIGN KEY ("editedBy") REFERENCES "User"("externalUID") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "property_usetype_id_fk" FOREIGN KEY ("useTypeId") REFERENCES "UseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property" ADD CONSTRAINT "property_zone_id_fk" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PropertyUser" ADD CONSTRAINT "propertyuser_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property_UseType" ADD CONSTRAINT "property_propertytype_property_id_fk" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Property_UseType" ADD CONSTRAINT "property_propertytype_propertytype_id_fk" FOREIGN KEY ("useTypeId") REFERENCES "UseType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "R_EquipmentTypes" ADD CONSTRAINT "r_equipmenttypes_r_equipmenttypes_id_fk" FOREIGN KEY ("parentId") REFERENCES "R_EquipmentTypes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelSystem" ADD CONSTRAINT "solarpanelsystem_mountingtype_id_fk" FOREIGN KEY ("mountingTypeId") REFERENCES "MountingType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelSystem" ADD CONSTRAINT "solarpanelsystem_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelSystem" ADD CONSTRAINT "solarpanelsystem_pvsystemtype_id_fk" FOREIGN KEY ("pvSystemTypeId") REFERENCES "PVSystemType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelSystem" ADD CONSTRAINT "solarpanelsystem_pvtechchoice_id_fk" FOREIGN KEY ("pvTechChoiceId") REFERENCES "PVTechChoice"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolarPanelSystem" ADD CONSTRAINT "solarpanelsystem_trackingtype_id_fk" FOREIGN KEY ("trackingTypeId") REFERENCES "TrackingType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceUsage" ADD CONSTRAINT "spaceusage_climatecontrol_id_fk" FOREIGN KEY ("climateControlId") REFERENCES "ClimateControl"("id") ON DELETE NO ACTION ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceUsage" ADD CONSTRAINT "spaceusage_fantype_id_fk" FOREIGN KEY ("fanTypeId") REFERENCES "FanType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceUsage" ADD CONSTRAINT "spaceusage_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SpaceUsage" ADD CONSTRAINT "spaceusage_spaceusagetype_id_fk" FOREIGN KEY ("usageTypeId") REFERENCES "SpaceUsageType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SustainabilityRating" ADD CONSTRAINT "sustainabilityrating_sustainabilityratingscheme_id_fk" FOREIGN KEY ("SustainabilityRatingSchemaId") REFERENCES "SustainabilityRatingScheme"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "user_authtype_id_fk" FOREIGN KEY ("authTypeId") REFERENCES "AuthType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "user_usertype_id_fk" FOREIGN KEY ("userTypeId") REFERENCES "UserType"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserDetail" ADD CONSTRAINT "userdetail_user_id_fk" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "zone_building_id_fk" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Zone" ADD CONSTRAINT "zone_floor_id_fk" FOREIGN KEY ("floorId") REFERENCES "Floor"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeatConsumption" ADD CONSTRAINT "heatconsumption_heatsupplierinformation_id_fk" FOREIGN KEY ("heatSupplierId") REFERENCES "HeatSupplierInformation"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeatConsumption" ADD CONSTRAINT "heatconsumption_property_id_fk" FOREIGN KEY ("propId") REFERENCES "Property"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HeatSupplierAPI" ADD CONSTRAINT "heatsupplierapi_heatsupplierinformation_id_fk" FOREIGN KEY ("heatSupplierInformationId") REFERENCES "HeatSupplierInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "HeatSupplierAreas" ADD CONSTRAINT "heatsupplierareas_hetasupplierinformation_id_fk" FOREIGN KEY ("heatSupplierInformationId") REFERENCES "HeatSupplierInformation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
