INSERT INTO public."Building" (name, "numberOfFloorAboveGroundLvl", "numberOfFloorBelowGroundLvl", 
	"buildingMajorOrientationId", "averageInternalFloorToCeilingHeight", "storeysAboveGround", 
	"storeysBelowGround", "averageInternalFloorToCeilingHeightUnit") 
VALUES ('Bahn Tower A', 0, 0, 1, 3.51, 26, 3, 'm');

INSERT INTO public."Property" ( "streetAddress", "postCode", city, state, region, 
	"countryCode", "grossFloorArea", "completionYear", "majorOrientationId", 
	"createdAt", "updatedAt", "buildingId", "floorId", "zoneId", "sustainabilityRatingSchemeId", 
	"sustainabilityRatingId", latitude, longitude, "grossInteriorArea", "netUsableArea", "useTypeId", 
	photo, "grossInteriorAreaUnit", "netUsableAreaUnit", "hasMajorRefurbishmentOrExtensionsDone", 
	"latestYearForRefurbishmentOrExtension", "statusId", "streetNumber", "streetName", "editedBy") 
VALUES ('2 Potsdamer Platz', '10785', 'Berlin', 'Berlin', null, 'DE', 0, 1991, 3, now(), null, 
	(SELECT max(id) FROM public."Building"), 
	null, null, 12, null, 51.5162529, -0.0809449, 461478, 436186, 16, 
	'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/9ef25a158b9dbb4c490c6d741389344c.jpg', 
	'ft2', 'ft2', false, null, 2, '110', 'Bishopsgate', 'qbJFllChUCP3dLYPbuQBFj2tpam2');



INSERT INTO public."AverageOperatingHours" ("propId", weekly, monthly, annually, 
	"mondayStart", "mondayEnd", "tuesdayStart", "tuesdayEnd", "wednesdayStart", 
	"wednesdayEnd", "thursdayStart", "thursdayEnd", "fridayStart", "fridayEnd", 
	"saturdayStart", "saturdayEnd", "sundayStart", "sundayEnd", "publicHolidayStart", "publicHolidayEnd") 
VALUES ((SELECT max(id) FROM public."Property"), null, null, null, '09:00', '18:00', '09:00', '18:00', '09:00', '18:00', '09:00', 
	'18:00', '09:00', '15:30', '11:00', '20:00', '09:00', '18:00', '11:30', '19:31');


INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1802468, 674298, 6, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2000470, 912600, 10, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1104690, 1058076, 1, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1553998, 627462, 0, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1717770, 659538, 10, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1580424, 540138, 5, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1554624, 817308, 4, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2206904, 653214, 3, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2416688, 1053636, 2, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2069042, 659004, 1, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2218468, 701220, 0, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2324796, 753330, 11, 2018, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1800000, 720000, 7, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1400000, 900000, 6, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1440000, 600012, 5, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1622000, 740304, 4, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1000000, 1133292, 3, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1330010, 1009758, 2, 2021, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2400000, 901818, 7, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1137800, 1118850, 6, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 912012, 999738, 5, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2246000, 1195212, 4, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2168000, 1206138, 3, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1998468, 1040892, 2, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1973776, 805290, 1, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2042224, 817434, 0, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1667776, 640716, 11, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1737776, 741000, 9, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 2036694, 874068, 11, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1765636, 751440, 8, 2020, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1858580, 931404, 9, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1908576, 974040, 8, 2019, (SELECT max(id) FROM public."Property"));
INSERT INTO public."ElectricityConsumption" ("electricitySupplierId", "monthlyCost", "monthlyValue", month, year, "propId") 
VALUES (null, 1933824, 738126, 7, 2019, (SELECT max(id) FROM public."Property"));


INSERT INTO public."LightingSystem" ("estimatedLightingLoad", "lightingFittingTypeId", "percentageOfFittingTypeUsed", "propId") 
VALUES (null, 2, 40, (SELECT max(id) FROM public."Property"));
INSERT INTO public."LightingSystem" ("estimatedLightingLoad", "lightingFittingTypeId", "percentageOfFittingTypeUsed", "propId") 
VALUES (null, 4, 25, (SELECT max(id) FROM public."Property"));
INSERT INTO public."LightingSystem" ("estimatedLightingLoad", "lightingFittingTypeId", "percentageOfFittingTypeUsed", "propId") 
VALUES (null, 5, 5, (SELECT max(id) FROM public."Property"));
INSERT INTO public."LightingSystem" ("estimatedLightingLoad", "lightingFittingTypeId", "percentageOfFittingTypeUsed", "propId") 
VALUES (null, 1, 20, (SELECT max(id) FROM public."Property"));
INSERT INTO public."LightingSystem" ("estimatedLightingLoad", "lightingFittingTypeId", "percentageOfFittingTypeUsed", "propId") 
VALUES (null, 3, 10, (SELECT max(id) FROM public."Property"));


INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery") 
VALUES (9, 20, 3, (SELECT max(id) FROM public."Property"), 'Restaurant', 3, false);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (12, 8, 4, (SELECT max(id) FROM public."Property"), 'Car Park', 3, false);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (6, 62, 3, (SELECT max(id) FROM public."Property"), 'Office', 1, false);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (6, 10, 1, (SELECT max(id) FROM public."Property"), 'Office', 1, false);



INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery") 
VALUES (1, 10, 1, (SELECT max(id) FROM public."Property"), 'office 1', 1, true);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (6, 55, 3, (SELECT max(id) FROM public."Property"), 'Office 2', 1, false);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (11, 20, 2, (SELECT max(id) FROM public."Property"), 'Office 3', 1, false);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (7, 8, 4, (SELECT max(id) FROM public."Property"), 'Gym 1', 1, true);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (12, 5, 4, (SELECT max(id) FROM public."Property"), 'Car Park', 2, false);
INSERT INTO public."SpaceUsage" ("usageTypeId", "usagePercentage", "climateControlId", "propId", title, "fanTypeId", "hasReheatRecovery")
 VALUES (5, 2, 5, (SELECT max(id) FROM public."Property"), 'Plant Room', 1, false);


INSERT INTO public."SolarPanelSystem" ("installedCapacity", "systemLoss", "inclineAngle", "trackingTypeId", "pvTechChoiceId", "pvSystemTypeId", "renewableEnergySystem", "propId", "mountingTypeId", "orientationAngle") 
VALUES (500, 23, 0, 1, 2, null, null, (SELECT max(id) FROM public."Property"), 2, 90);
INSERT INTO public."SolarPanelSystem" ("installedCapacity", "systemLoss", "inclineAngle", "trackingTypeId", "pvTechChoiceId", "pvSystemTypeId", "renewableEnergySystem", "propId", "mountingTypeId", "orientationAngle") 
VALUES (1200, 9, 0, 2, 2, null, null, (SELECT max(id) FROM public."Property"), 1, null);
INSERT INTO public."SolarPanelSystem" ("installedCapacity", "systemLoss", "inclineAngle", "trackingTypeId", "pvTechChoiceId", "pvSystemTypeId", "renewableEnergySystem", "propId", "mountingTypeId", "orientationAngle") 
VALUES (800, 10, null, 3, 3, null, null, (SELECT max(id) FROM public."Property"), 1, 58);
INSERT INTO public."SolarPanelSystem" ("installedCapacity", "systemLoss", "inclineAngle", "trackingTypeId", "pvTechChoiceId", "pvSystemTypeId", "renewableEnergySystem", "propId", "mountingTypeId", "orientationAngle") 
VALUES (8000, 10, null, 4, 1, null, null, (SELECT max(id) FROM public."Property"), 2, null);


INSERT INTO public."HeatingSystem" ("propId", "heatingSystemTypeId", "estimatedHeatingSystemEfficiency", "estimatedHeatingLoad", "percentageHeatedFloorArea") 
VALUES ((SELECT max(id) FROM public."Property"), 1, null, null, null);

INSERT INTO public."Heater" ("heaterTypeId", capacity, "manufacturerId", "modelId", "heaterEnergySourceId", "heatingSystemId") 
VALUES (2, null, null, null, 1, (SELECT max(id) FROM public."HeatingSystem"));


INSERT INTO public."CoolingSystem" ("estimatedCoolingSystemEfficiency", "propId", "estimatedCoolingLoad", "percentageCooledFloorArea", "coolingSystemTypeId") 
VALUES (null, (SELECT max(id) FROM public."Property"), null, null, 1);

INSERT INTO public."Chiller" ("chillerTypeId", "compressorTypeId", capacity, "refrigerantTypeId", "manufacturerId", "modelId", "chillerEnergySourceTypeId", "coolingSystemId") 
VALUES (null, 1, null, 5, null, null, 4, (SELECT max(id) FROM public."CoolingSystem"));


INSERT INTO public."ExternalEnvelopeSubSystem" ("externalWindowToWallRatio", "externalRoofInsulationTypeId", "externalWallInsulationTypeId", "externalWindowInsulationTypeId", "groundInsulationTypeId", "floorInsulationTypeId", "roofInsulationTypeId", "floorName", "zoneName", "propId", "externalGroundInsulationTypeId") 
VALUES (0.7, null, null, 2, null, null, 1, null, null, (SELECT max(id) FROM public."Property"), null);


INSERT INTO public."Equipments" ("equipId", "dis", "equipTypeId", "isEquipmentAsset", "propertyId", "parentId", 
        "coolingSystemId", "heatingSystemId", "lightingSystemId", "spaceUsageId", "mechanicalVentilationSystemId")
VALUES  ('Bahn Tower Air Sample Handling Units-AIR6M-04', 'Air Handling Units-AIR6M-04', 2, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Boilers-AIR6M-02', 'Boilers-AIR6M-02', 6, true, (SELECT max(id) FROM public."Property"), null, null, 34, null, null, null),
        ('Bahn Tower Sample Air Handling Units-AIR6M-02', 'Air Handling Units-AIR6M-02', 2, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Air Handling Units-AIR6M-05', 'Air Handling Units-AIR6M-05', 2, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Chilled Water Pumps-3040-02', 'Chilled Water Pumps-3040-02', 75, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Chiller-CH14W-01', 'Chiller-CH14W-01', 7, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Chiller-CH14W-02', 'Chiller-CH14W-02', 7, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Boiler-AIR6M-01', 'Boiler-AIR6M-01', 6, true, (SELECT max(id) FROM public."Property"), null, null, 34, null, null, null),
        ('Bahn Tower Sample Cooling Tower-Tower50C-01', 'Cooling Tower-Tower50C-02', 10, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Pump-3040-03', 'Pump-3040-03', 36, true, (SELECT max(id) FROM public."Property"), null, null, 34, null, null, null),
        ('Bahn Tower Sample Air Handling Units-AIR6M-03', 'Air Handling Units-AIR6M-03', 2, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower SampleChiller-CH10S', 'Chiller-CH10S', 7, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Air Handling Units-AIR6M-01', 'Air Handling Units-AIR6M-01', 2, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Boiler-AIR6M-02', 'Boiler-AIR6M-02', 6, true, (SELECT max(id) FROM public."Property"), null, null, 34, null, null, null),
        ('Bahn Tower Sample Pump-3040-01', 'Pump-AIR6M-02', 36, true, (SELECT max(id) FROM public."Property"), null, null, 34, null, null, null),
        ('Bahn Tower Sample Cooling Tower-Tower50C-02', 'Cooling Tower-Tower50C-02', 10, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Mechanical Ventilation Fan-GTS095QC-02', 'MV Fan-GTS095QC-02', 76, true, (SELECT max(id) FROM public."Property"), null, null, null, null, null, 6),
        ('Bahn Tower Sample Chilled Water Pumps-3040-03', 'Chilled Water Pumps-3040-03', 75, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Mechanical Ventilation Fan-GTS1165RC-03', 'MV Fan-GTS1165RC-03', 76, true, (SELECT max(id) FROM public."Property"), null, null, null, null, null, 6),
        ('Bahn Tower Sample Pump-3040-02', 'Pump-3040-02', 36, true, (SELECT max(id) FROM public."Property"), null, null, 34, null, null, null),
        ('Bahn Tower Sample Mechanical Ventilation Fan-GTS1165RC-01', 'MV Fan-GTS1165RC-01', 76, true, (SELECT max(id) FROM public."Property"), null, null, null, null, null, 6),
        ('Bahn Tower Sample Mechanical Ventilation Fan-GTS095QC-01', 'MV Fan-GTS095QC-01', 76, true, (SELECT max(id) FROM public."Property"), null, null, null, null, null, 6),
        ('Bahn Tower Sample Mechanical Ventilation Fan-GTS1165RC-02', 'MV Fan-GTS1165RC-02', 76, true, (SELECT max(id) FROM public."Property"), null, null, null, null, null, 6),
        ('Bahn Tower Sample Chilled Water Pumps-3040-01', 'Chilled Water Pumps-3040-01', 75, true, (SELECT max(id) FROM public."Property"), null, 31, null, null, null, null),
        ('Bahn Tower Sample Boilers-AIR6M-01', 'Boilers-AIR6M-01', 6, true, (SELECT max(id) FROM public."Property"), null, null, 34, null, null, null);


INSERT INTO public."Points" ("equipId", "currentValue", "unit", "createdAt", 
        "updatedAt", "currentStatus", "currentError", "pointFunctionId", "dis")
VALUES  (75, null, 'kWh', '2021-10-09 11:18:37.168736', null, 1, 0, 1, null),
        (65, null, 'kWh', '2021-10-09 11:33:43.338186', null, 1, 0, 1, null),
        (73, null, 'kWh', '2021-10-09 11:43:26.576189', null, 1, 0, 1, null),
        (63, null, 'kWh', '2021-10-09 11:51:26.039142', null, 1, 0, 1, null),
        (68, null, 'kWh', '2021-10-09 12:21:08.378576', null, 1, 0, 1, null),
        (69, null, 'kWh', '2021-10-09 12:27:35.451494', null, 1, 0, 1, null),
        (74, null, 'kWh', '2021-10-09 13:32:29.905678', null, 1, 0, 1, null),
        (71, null, 'kWh', '2021-10-09 13:42:33.014949', null, 1, 0, 1, null),
        (78, null, 'kWh', '2021-10-09 13:45:51.420397', null, 1, 0, 1, null),
        (86, null, 'kWh', '2021-10-09 13:48:06.753144', null, 1, 0, 1, null),
        (67, null, 'kWh', '2021-10-09 13:50:35.770965', null, 1, 0, 1, null),
        (87, null, 'kWh', '2021-10-09 13:59:06.375853', null, 1, 0, 1, null),
        (76, null, 'kWh', '2021-10-09 14:01:10.881794', null, 1, 0, 1, null),
        (77, null, 'kWh', '2021-10-09 14:03:27.420796', null, 1, 0, 1, null),
        (82, null, 'kWh', '2021-10-09 14:08:07.569131', null, 1, 0, 1, null),
        (72, null, 'kWh', '2021-10-09 14:09:45.874694', null, 1, 0, 1, null),
        (83, null, 'kWh', '2021-10-09 14:19:05.687969', null, 1, 0, 1, null),
        (85, null, 'kWh', '2021-10-09 14:21:43.794639', null, 1, 0, 1, null),
        (81, null, 'kWh', '2021-10-09 14:23:35.679439', null, 1, 0, 1, null),
        (84, null, 'kWh', '2021-10-09 14:26:07.759521', null, 1, 0, 1, null),
        (79, null, 'kWh', '2021-10-09 14:28:53.324374', null, 1, 0, 1, null);


insert into public."EquipmentDetail" ("equipmentId", "manufacturer", "model", "capacity", "installDate", "commissioned", 
        "depreciationMode", "estimatedUsefulLife", "initialAssetCost", "refrigerantTypeId" , "flowTypeId", "maxHead", 
        "maxFlowRate", "maxPower", "ratedCapacity", "standardAirFlowCoilFaceVelocity", "requiredFlowRate", "nominalRPM", 
        "maxStaticPressure", "flowRateAtMinStaticPressure", "sonesAtMinStaticPressure", "maxStaticPressure2", 
        "flowRateAtMinStaticPressure2", "sonesAtMinStaticPressure2", "location", "imageUrl")
values  (68, 'Chills', 'CH14W', 300, '2007-06-23', '2007-05-07', 'Straight Line', 20, 23000, 3, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'Plant-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/Chiller.webp'),
        (69, 'Chills', 'CH14W', 300, '2007-06-23', '2007-05-07', 'Straight Line', 20, 23000, 3, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'Plant-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/Chiller.webp'),
        (74, 'Chills', 'CH10S', 200, '2007-06-23', '2007-05-07', 'Straight Line', 20, 18000, 3, null, null, null, null, null, null, null, null, null, null, null, null, null, null, 'Plant-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/Chiller.webp'),
        (71, 'Winderns', 'Tower50C', 400, '2007-06-16', '2007-05-07', 'Straight Line', 20, 16000, null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, 'Roof-SVC01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/Cooler01.webp'),
        (78, 'Winderns', 'Tower50C', 400, '2007-06-16', '2007-05-07', 'Straight Line', 20, 16000, null, 1, null, null, null, null, null, null, null, null, null, null, null, null, null, 'Roof-SVC01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/Cooler02.webp'),
        (86, 'Legstrom', '3040', null, '2017-04-25', '2017-05-09', 'Straight Line', 10, 3500, null, 1, 20, 180, 7.5, null, null, null, null, null, null, null, null, null, null, 'Plant-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/pump04.webp'),
        (67, 'Legstrom', '3040', null, '2018-07-16', '2018-07-24', 'Straight Line', 10, 3500, null, 1, 20, 180, 7.5, null, null, null, null, null, null, null, null, null, null, 'Plant-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/pump04.webp'),
        (80, 'Legstrom', '3040', null, '2017-09-05', '2017-09-13', 'Straight Line', 10, 3500, null, 1, 20, 180, 7.5, null, null, null, null, null, null, null, null, null, null, 'Plant-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/pump04.webp'),
        (75, 'Maikon', 'AIR6M', null, '2007-06-16', '2017-07-05', 'Straight Line', 20, 5300, null, null, null, null, null, 19.4, 3780, null, null, null, null, null, null, null, null, 'AHU-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/ahu03.webp'),
        (65, 'Maikon', 'AIR6M', null, '2007-06-16', '2017-07-05', 'Straight Line', 20, 5300, null, null, null, null, null, 19.4, 3780, null, null, null, null, null, null, null, null, 'AHU-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/ahu04.webp'),
        (73, 'Maikon', 'AIR6M', null, '2007-06-16', '2017-07-05', 'Straight Line', 20, 5300, null, null, null, null, null, 19.4, 3780, null, null, null, null, null, null, null, null, 'AHU-RM03', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/ahu-05.webp'),
        (63, 'Maikon', 'AIR6M', null, '2007-06-16', '2017-07-05', 'Straight Line', 20, 5300, null, null, null, null, null, 19.4, 3780, null, null, null, null, null, null, null, null, 'AHU-RM04', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/ahu02.webp'),
        (66, 'Maikon', 'AIR6M', null, '2007-06-16', '2017-07-05', 'Straight Line', 20, 5300, null, null, null, null, null, 19.4, 3780, null, null, null, null, null, null, null, null, 'AHU-RM05', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/ahu01.webp'),
        (64, 'Legstrom', '3040', null, '2017-04-25', '2017-05-09', 'Straight Line', 10, 3500, null, null, 20, 180, 7.5, null, null, null, null, null, null, null, null, null, null, 'Plant-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/pump3.webp'),
        (70, 'Meers', 'AIR6M', null, '2017-06-23', '2017-07-11', 'Straight Line', 10, 5300, null, null, null, null, null, 60, null, 21, null, null, null, null, null, null, null, 'Plant-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/mv04.webp'),
        (76, 'Meers', 'AIR6M', null, '2018-06-23', '2018-07-11', 'Straight Line', 10, 5300, null, null, null, null, null, 60, null, 21, null, null, null, null, null, null, null, 'Plant-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/mv04.webp'),
        (77, 'Legstrom', '3040', null, '2017-04-25', '2017-05-09', 'Straight Line', 10, 3500, null, null, 20, 180, 7.5, null, null, null, null, null, null, null, null, null, null, 'Plant-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/pump3.webp'),
        (82, 'Legstrom', '3040', null, '2018-07-16', '2018-07-24', 'Straight Line', 10, 3500, null, null, 20, 180, 7.5, null, null, null, null, null, null, null, null, null, null, 'Plant-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/pump3.png'),
        (72, 'Legstrom', '3040', null, '2017-09-05', '2017-09-13', 'Straight Line', 10, 3500, null, null, 20, 180, 7.5, null, null, null, null, null, null, null, null, null, null, 'Plant-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/pump02.webp'),
        (73, 'Jock', 'GTS1165RC', null, '2017-04-25', '2017-05-02', 'Straight Line', 10, 1200, null, null, null, null, 0.566, null, null, null, 1550, 0.125, 1919, 8.3, 1.75, 213, 10, 'CARPARK-01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/mv03.webp'),
        (85, 'Jock', 'GTS1165RC', null, '2017-04-25', '2017-05-02', 'Straight Line', 10, 1200, null, null, null, null, 0.566, null, null, null, 1550, 0.125, 1919, 8.3, 1.75, 213, 10, 'MV-RM03', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/mv01.webp'),
        (81, 'Jock', 'GTS1165RC', null, '2017-04-25', '2017-05-02', 'Straight Line', 10, 1200, null, null, null, null, 0.566, null, null, null, 1550, 0.125, 1919, 8.3, 1.75, 213, 10, 'CARPARK-02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/mv02.webp'),
        (84, 'Jock', 'GTS095QC', null, '2017-07-06', '2017-07-14', 'Straight Line', 10, 980, null, null, null, null, 0.338, null, null, null, 1725, 0.125, 1111, 10.6, 1.5, 200, 10.8, 'MV-RM01', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/mv03.webp'),
        (79, 'Jock', 'GTS095QC', null, '2017-07-06', '2017-07-14', 'Straight Line', 10, 980, null, null, null, null, 0.338, null, null, null, 1725, 0.125, 1111, 10.6, 1.5, 200, 10.8, 'MV-RM02', 'https://raw.githubusercontent.com/BEEUK/cdn/master/BEE/mv03.webp');