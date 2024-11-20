/*
  Warnings:

  - You are about to drop the column `floorId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the column `zoneId` on the `Property` table. All the data in the column will be lost.
  - You are about to drop the `Zone` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" DROP CONSTRAINT "externalenvelopesubsystem_groundinsulationtype_id_fk";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "property_floor_id_fk";

-- DropForeignKey
ALTER TABLE "Property" DROP CONSTRAINT "property_zone_id_fk";

-- DropForeignKey
ALTER TABLE "SustainabilityRating" DROP CONSTRAINT "sustainabilityrating_sustainabilityratingscheme_id_fk";

-- DropForeignKey
ALTER TABLE "Zone" DROP CONSTRAINT "zone_building_id_fk";

-- DropForeignKey
ALTER TABLE "Zone" DROP CONSTRAINT "zone_floor_id_fk";

-- AlterTable
ALTER TABLE "ExternalEnvelopeSubSystem" ALTER COLUMN "groundInsulationTypeId" SET DEFAULT 3;

-- AlterTable
ALTER TABLE "Property" DROP COLUMN "floorId",
DROP COLUMN "zoneId";

-- DropTable
DROP TABLE "Zone";

-- CreateTable
CREATE TABLE "BCA_CivicCommunityCulturalInstitution" (
    "id" SERIAL NOT NULL,
    "buildingName" TEXT,
    "address" TEXT,
    "buildingType" TEXT,
    "mainFunction" TEXT,
    "buildingsize" TEXT,
    "Y2020EUI" INTEGER,
    "Y2020EUIQuartileOrEnergy" INTEGER,
    "Y2021EUI" INTEGER,
    "Y2021EUIQuartileEnergyRanking" TEXT,
    "Y2022EUI" TEXT,
    "Y2022EUIQuartileEnergyRanking" TEXT,
    "topORCSCYear" TEXT,
    "awardGreenOrNonGreen" TEXT,
    "yearOfGMAward" TEXT,
    "greenMarkVersion" TEXT,
    "gfa" TEXT,
    "acArea" TEXT,
    "acAreaPercentage" TEXT,
    "noOfHotelRoom" TEXT,
    "acType" TEXT,
    "ageOfChiller" TEXT,
    "airConSystemEfficiency" REAL,
    "dateOfLastAuditorHealthCheck" TEXT,
    "reasonForHighEUI" TEXT,

    CONSTRAINT "bca_civiccommunityculturalinstitution_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCA_CommercialBuilding" (
    "id" SERIAL NOT NULL,
    "buildingName" TEXT,
    "address" TEXT,
    "buildingType" TEXT,
    "mainFunction" TEXT,
    "buildingSize" TEXT,
    "Y2020EUI" INTEGER,
    "Y2020EUIQuartileOrEnergyRanking" TEXT,
    "Y2021EUI" INTEGER,
    "Y2021EUIQuartileOrEnergyRanking" TEXT,
    "Y2022EUI" INTEGER,
    "Y2022EUIQuartileOrEnergyRanking" TEXT,
    "topORCSCYear" TEXT,
    "awardGreenOrNonGreen" TEXT,
    "yearOfGMAward" TEXT,
    "greenMarkVersion" TEXT,
    "gfa" TEXT,
    "acArea" REAL,
    "acAreaPercentage" TEXT,
    "noOfHotelRoom" TEXT,
    "acType" TEXT,
    "ageOfChiller" REAL,
    "airConSystemEfficiency" REAL,
    "dateOfLastAuditorHealthCheck" TEXT,
    "reasonForHighEUI" TEXT,

    CONSTRAINT "bca_commercialbuilding_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCA_EducationalInstitution" (
    "id" SERIAL NOT NULL,
    "buildingName" TEXT,
    "address" TEXT,
    "buildingType" TEXT,
    "mainFunction" TEXT,
    "buildingSize" TEXT,
    "Y2020EUI" INTEGER,
    "Y2020EUIQuartileOrEnergyRanking" INTEGER,
    "Y2021EUI" INTEGER,
    "Y2021EUIQuartileEnergyRanking" INTEGER,
    "Y2022EUI" INTEGER,
    "Y2022EUIQuartileEnergyRanking" INTEGER,
    "topORCSCYear" INTEGER,
    "awardGreenOrNonGreen" TEXT,
    "yearOfGMAward" TEXT,
    "greenMarkVersion" TEXT,
    "gfa" REAL,
    "acArea" TEXT,
    "acAreaPercentage" TEXT,
    "noOfHotelRoom" REAL,
    "acType" TEXT,
    "ageOfChiller" REAL,
    "airConSystemEfficiency" TEXT,
    "dateOfLastAuditorHealthCheck" TEXT,
    "reasonForHighEUI" TEXT,

    CONSTRAINT "bca_educationalinstitution_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCA_HealthcareFacility" (
    "id" SERIAL NOT NULL,
    "buildingName" TEXT,
    "address" TEXT,
    "buildingType" TEXT,
    "mainFunction" TEXT,
    "buildingSize" TEXT,
    "Y2020EUI" INTEGER,
    "2020EUIQuartileEnergyRanking" INTEGER,
    "Y2021EUI" INTEGER,
    "Y2021EUIQuartileEnergyRanking" INTEGER,
    "Y2022EUI" INTEGER,
    "Y2022EUIQuartileEnergyRanking" INTEGER,
    "topORCSCYear" INTEGER,
    "awardGreenOrNonGreen" TEXT,
    "yearOfGMAward" INTEGER,
    "greenMark Version" TEXT,
    "gfa" REAL,
    "acArea" REAL,
    "acAreaPercentage" TEXT,
    "noOfHotel Room" INTEGER,
    "acType" TEXT,
    "ageOfChiller" REAL,
    "airConSystemEfficiency" DOUBLE PRECISION,
    "dateOfLastAuditorHealthCheck" TEXT,
    "reasonForHighEUI" TEXT,

    CONSTRAINT "bca_healthcarefacility_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BCA_SportRecreationCentre" (
    "id" SERIAL NOT NULL,
    "buildingName" TEXT,
    "address" TEXT,
    "buildingType" TEXT,
    "mainFunction" TEXT,
    "buildingSize" TEXT,
    "Y2020EUI" INTEGER,
    "Y2020EUIQuartileOrEnergyRanking" INTEGER,
    "Y2021EUI" INTEGER,
    "Y2021EUIQuartileOrEnergyRanking" INTEGER,
    "Y2022EUI" INTEGER,
    "Y2022EUIQuartileOrEnergyRanking" INTEGER,
    "topORCSCYear" INTEGER,
    "awardGreenOrNonGreen" TEXT,
    "yearOfGMAward" INTEGER,
    "greenMarkVersion" TEXT,
    "gfa" REAL,
    "acArea" REAL,
    "acAreaPercentage" TEXT,
    "noOfHotelRoom" INTEGER,
    "acType" TEXT,
    "ageOfChiller" INTEGER,
    "airConSystemEfficiency" REAL,
    "dateOfLastAuditorHealthCheck" TEXT,
    "reasonForHighEUI" TEXT,

    CONSTRAINT "bca_sportrecreationcentre_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCAF_EuropeanBuildingMortgageEURMetric" (
    "id" SERIAL NOT NULL,
    "assetClassName" TEXT,
    "emissionFactorTypeName" TEXT,
    "emissionFactorOptionName" TEXT,
    "regionName" TEXT,
    "countryName" TEXT,
    "stateName" TEXT,
    "industryClassificationName" TEXT,
    "industryClassificationCodeName" TEXT,
    "dataLevel1InformationName" TEXT,
    "dataLevel2InformationName" TEXT,
    "dataLevel3InformationName" TEXT,
    "dataLevel4InformationName" TEXT,
    "dataLevel5InformationName" TEXT,
    "emissionFactorFunctionalUnitName" TEXT,
    "emissionFactorFunctionalUnitUnitName" TEXT,
    "emissionFactorName" TEXT,
    "emissionFactorUnitName" TEXT,
    "emissionFactorDataQualityName" INTEGER,
    "scope1EmissionFactor" TEXT,
    "scope2EmissionFactor" TEXT,
    "scope3UpstreamEmissionFactor" TEXT,
    "scope3DownstreamEmissionFactor" TEXT,
    "unspecifiedEmissionFactor" REAL,
    "informationOnUnspecifiedEmissionFactorName" TEXT,
    "avoidedEmissionsEmissionFactor" TEXT,
    "carbonSequestrationEmissionFactor" TEXT,
    "emissionFactorMethodologyDescriptionName" TEXT,
    "emissionFactorSources1Name" TEXT,
    "emissionFactorYears1Name" INTEGER,
    "emissionFactorSources2Name" TEXT,
    "emissionFactorYears2Name" TEXT,
    "emissionFactorSources3Name" TEXT,
    "emissionFactorYears3Name" TEXT,
    "linkToEmissionFactorName" TEXT,
    "statusName" TEXT,

    CONSTRAINT "pcaf_europeanbuildingmortgageeurmetric_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PCAF_EuropeanCommercialBuildingEmissionFactor" (
    "id" BIGSERIAL NOT NULL,
    "sourceName" TEXT,
    "year" INTEGER,
    "assetClass" TEXT,
    "dataQualityScore" INTEGER,
    "methodologyOption" TEXT,
    "factorType" TEXT,
    "emissionFactorUnit" TEXT,
    "activityVariable" TEXT,
    "dependencies" TEXT,
    "country" TEXT,
    "countryCode" TEXT,
    "subdivision" TEXT,
    "epcRating" TEXT,
    "buildingCategory" TEXT,
    "buildingType" TEXT,
    "value" REAL,
    "comments" TEXT,

    CONSTRAINT "pcaf_europeancommercialbuildingemissionfactor_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Space" (
    "id" INTEGER NOT NULL,
    "name" VARCHAR,
    "buildingId" INTEGER,
    "spaceUsageTypeId" INTEGER NOT NULL,
    "area" DOUBLE PRECISION,
    "floor" INTEGER,

    CONSTRAINT "zone_pk" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ExternalEnvelopeSubSystem" ADD CONSTRAINT "externalenvelopesubsystem_groundinsulationtype__fk" FOREIGN KEY ("groundInsulationTypeId") REFERENCES "GroundInsulationType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SustainabilityRating" ADD CONSTRAINT "sustainabilityrating_sustainabilityratingscheme_id_fk" FOREIGN KEY ("SustainabilityRatingSchemaId") REFERENCES "SustainabilityRatingScheme"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "space_spaceusagetype_id_fk" FOREIGN KEY ("spaceUsageTypeId") REFERENCES "SpaceUsageType"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Space" ADD CONSTRAINT "zone_building_id_fk" FOREIGN KEY ("buildingId") REFERENCES "Building"("id") ON DELETE CASCADE ON UPDATE CASCADE;
