
Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 5.12.1
 * Query Engine version: 473ed3124229e22d881cb7addf559799debae1ab
 */
Prisma.prismaVersion = {
  client: "5.12.1",
  engine: "473ed3124229e22d881cb7addf559799debae1ab"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.NotFoundError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`NotFoundError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}

/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AuthTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.AverageOperatingHoursScalarFieldEnum = {
  id: 'id',
  propId: 'propId',
  weekly: 'weekly',
  monthly: 'monthly',
  annually: 'annually',
  mondayStart: 'mondayStart',
  mondayEnd: 'mondayEnd',
  tuesdayStart: 'tuesdayStart',
  tuesdayEnd: 'tuesdayEnd',
  wednesdayStart: 'wednesdayStart',
  wednesdayEnd: 'wednesdayEnd',
  thursdayStart: 'thursdayStart',
  thursdayEnd: 'thursdayEnd',
  fridayStart: 'fridayStart',
  fridayEnd: 'fridayEnd',
  saturdayStart: 'saturdayStart',
  saturdayEnd: 'saturdayEnd',
  sundayStart: 'sundayStart',
  sundayEnd: 'sundayEnd',
  publicHolidayStart: 'publicHolidayStart',
  publicHolidayEnd: 'publicHolidayEnd'
};

exports.Prisma.BuildingScalarFieldEnum = {
  id: 'id',
  name: 'name',
  numberOfFloorAboveGroundLvl: 'numberOfFloorAboveGroundLvl',
  numberOfFloorBelowGroundLvl: 'numberOfFloorBelowGroundLvl',
  buildingMajorOrientationId: 'buildingMajorOrientationId',
  averageInternalFloorToCeilingHeight: 'averageInternalFloorToCeilingHeight',
  storeysAboveGround: 'storeysAboveGround',
  storeysBelowGround: 'storeysBelowGround',
  averageInternalFloorToCeilingHeightUnit: 'averageInternalFloorToCeilingHeightUnit'
};

exports.Prisma.BuildingMajorOrientationScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.CO2EmissionRateScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  country: 'country',
  state: 'state',
  city: 'city',
  gridEmissionRate: 'gridEmissionRate',
  electricitySupplierInformationId: 'electricitySupplierInformationId'
};

exports.Prisma.ChillerScalarFieldEnum = {
  id: 'id',
  chillerTypeId: 'chillerTypeId',
  compressorTypeId: 'compressorTypeId',
  capacity: 'capacity',
  refrigerantTypeId: 'refrigerantTypeId',
  manufacturerId: 'manufacturerId',
  modelId: 'modelId',
  chillerEnergySourceTypeId: 'chillerEnergySourceTypeId',
  coolingSystemId: 'coolingSystemId'
};

exports.Prisma.ChillerEnergySourceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.ChillerTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.ClimateControlScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.CompressorTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.CoolingHistorizedPointScalarFieldEnum = {
  id: 'id',
  pointId: 'pointId',
  value: 'value',
  unit: 'unit',
  createdAt: 'createdAt',
  propId: 'propId'
};

exports.Prisma.CoolingSystemScalarFieldEnum = {
  id: 'id',
  estimatedCoolingSystemEfficiency: 'estimatedCoolingSystemEfficiency',
  propId: 'propId',
  estimatedCoolingLoad: 'estimatedCoolingLoad',
  percentageCooledFloorArea: 'percentageCooledFloorArea',
  coolingSystemTypeId: 'coolingSystemTypeId'
};

exports.Prisma.CoolingSystemTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.ElectricityConsumptionScalarFieldEnum = {
  id: 'id',
  electricitySupplierId: 'electricitySupplierId',
  monthlyCost: 'monthlyCost',
  monthlyValue: 'monthlyValue',
  month: 'month',
  year: 'year',
  propId: 'propId'
};

exports.Prisma.ElectricitySupplierAPIScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  apiUrl: 'apiUrl',
  apiKey: 'apiKey',
  apiFormat: 'apiFormat',
  electricitySupplierInformationId: 'electricitySupplierInformationId'
};

exports.Prisma.ElectricitySupplierAreasScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  countryService: 'countryService',
  stateService: 'stateService',
  cityService: 'cityService',
  electricitySupplierInformationId: 'electricitySupplierInformationId'
};

exports.Prisma.ElectricitySupplierInformationScalarFieldEnum = {
  id: 'id',
  companyName: 'companyName',
  apiKey: 'apiKey'
};

exports.Prisma.EquipmentDetailScalarFieldEnum = {
  id: 'id',
  equipmentId: 'equipmentId',
  manufacturer: 'manufacturer',
  model: 'model',
  capacity: 'capacity',
  installDate: 'installDate',
  commissioned: 'commissioned',
  depreciationMode: 'depreciationMode',
  estimatedUsefulLife: 'estimatedUsefulLife',
  initialAssetCost: 'initialAssetCost',
  refrigerantTypeId: 'refrigerantTypeId',
  flowTypeId: 'flowTypeId',
  maxHead: 'maxHead',
  maxFlowRate: 'maxFlowRate',
  maxPower: 'maxPower',
  ratedCapacity: 'ratedCapacity',
  standardAirFlowCoilFaceVelocity: 'standardAirFlowCoilFaceVelocity',
  requiredFlowRate: 'requiredFlowRate',
  nominalRPM: 'nominalRPM',
  maxStaticPressure: 'maxStaticPressure',
  flowRateAtMinStaticPressure: 'flowRateAtMinStaticPressure',
  sonesAtMinStaticPressure: 'sonesAtMinStaticPressure',
  maxStaticPressure2: 'maxStaticPressure2',
  flowRateAtMinStaticPressure2: 'flowRateAtMinStaticPressure2',
  sonesAtMinStaticPressure2: 'sonesAtMinStaticPressure2',
  location: 'location',
  imageUrl: 'imageUrl'
};

exports.Prisma.EquipmentsScalarFieldEnum = {
  id: 'id',
  equipId: 'equipId',
  dis: 'dis',
  equipTypeId: 'equipTypeId',
  isEquipmentAsset: 'isEquipmentAsset',
  propertyId: 'propertyId',
  parentId: 'parentId',
  coolingSystemId: 'coolingSystemId',
  heatingSystemId: 'heatingSystemId',
  lightingSystemId: 'lightingSystemId',
  spaceUsageId: 'spaceUsageId',
  mechanicalVentilationSystemId: 'mechanicalVentilationSystemId'
};

exports.Prisma.ExternalEnvelopeSubSystemScalarFieldEnum = {
  id: 'id',
  externalWindowToWallRatio: 'externalWindowToWallRatio',
  externalRoofInsulationTypeId: 'externalRoofInsulationTypeId',
  externalWallInsulationTypeId: 'externalWallInsulationTypeId',
  externalWindowInsulationTypeId: 'externalWindowInsulationTypeId',
  groundInsulationTypeId: 'groundInsulationTypeId',
  floorInsulationTypeId: 'floorInsulationTypeId',
  roofInsulationTypeId: 'roofInsulationTypeId',
  floorName: 'floorName',
  zoneName: 'zoneName',
  propId: 'propId',
  externalGroundInsulationTypeId: 'externalGroundInsulationTypeId'
};

exports.Prisma.FanTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.FloorScalarFieldEnum = {
  id: 'id',
  buildingId: 'buildingId',
  name: 'name',
  number: 'number',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.GroundInsulationTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  uValue: 'uValue',
  type: 'type'
};

exports.Prisma.HeaterScalarFieldEnum = {
  id: 'id',
  heaterTypeId: 'heaterTypeId',
  capacity: 'capacity',
  manufacturerId: 'manufacturerId',
  modelId: 'modelId',
  heaterEnergySourceId: 'heaterEnergySourceId',
  heatingSystemId: 'heatingSystemId'
};

exports.Prisma.HeaterEnergySourceScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.HeaterTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.HeatingHistorizedPointScalarFieldEnum = {
  id: 'id',
  pointId: 'pointId',
  value: 'value',
  unit: 'unit',
  createdAt: 'createdAt',
  propId: 'propId'
};

exports.Prisma.HeatingSystemScalarFieldEnum = {
  id: 'id',
  propId: 'propId',
  heatingSystemTypeId: 'heatingSystemTypeId',
  estimatedHeatingSystemEfficiency: 'estimatedHeatingSystemEfficiency',
  estimatedHeatingLoad: 'estimatedHeatingLoad',
  percentageHeatedFloorArea: 'percentageHeatedFloorArea'
};

exports.Prisma.HeatingSystemTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.LightingFittingTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.LightingHistorizedPointScalarFieldEnum = {
  id: 'id',
  propId: 'propId',
  value: 'value',
  unit: 'unit',
  createdAt: 'createdAt',
  pointId: 'pointId'
};

exports.Prisma.LightingSystemScalarFieldEnum = {
  id: 'id',
  estimatedLightingLoad: 'estimatedLightingLoad',
  lightingFittingTypeId: 'lightingFittingTypeId',
  percentageOfFittingTypeUsed: 'percentageOfFittingTypeUsed',
  propId: 'propId',
  numberOfBulbs: 'numberOfBulbs',
  wattRatingOfBulb: 'wattRatingOfBulb',
  lumensOfBulb: 'lumensOfBulb',
  title: 'title',
  numberOfDaysUsedPerWeek: 'numberOfDaysUsedPerWeek',
  numberOfHoursUsedPerDay: 'numberOfHoursUsedPerDay'
};

exports.Prisma.LightingSystemImprovementScalarFieldEnum = {
  id: 'id',
  userExternalId: 'userExternalId',
  lightSystemId: 'lightSystemId',
  numberOfBulbs: 'numberOfBulbs',
  wattRating: 'wattRating',
  lumenRating: 'lumenRating',
  costOfEachBulb: 'costOfEachBulb',
  numberOfDaysPerWeek: 'numberOfDaysPerWeek',
  numberOfHoursPerDay: 'numberOfHoursPerDay'
};

exports.Prisma.MechanicalVentilationHistorizedPointScalarFieldEnum = {
  id: 'id',
  pointId: 'pointId',
  value: 'value',
  unit: 'unit',
  createdAt: 'createdAt',
  propId: 'propId'
};

exports.Prisma.MechanicalVentilationSystemScalarFieldEnum = {
  id: 'id',
  fantTypeId: 'fantTypeId',
  hasHeatRecovery: 'hasHeatRecovery',
  spaceUsageId: 'spaceUsageId'
};

exports.Prisma.MountingTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.OverallHistorizedPointScalarFieldEnum = {
  id: 'id',
  propId: 'propId',
  value: 'value',
  unit: 'unit',
  createdAt: 'createdAt'
};

exports.Prisma.PVSystemTypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PVTechChoiceScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.PointsScalarFieldEnum = {
  id: 'id',
  equipId: 'equipId',
  currentValue: 'currentValue',
  unit: 'unit',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  currentStatus: 'currentStatus',
  currentError: 'currentError',
  pointFunctionId: 'pointFunctionId',
  dis: 'dis'
};

exports.Prisma.PropertyScalarFieldEnum = {
  id: 'id',
  streetAddress: 'streetAddress',
  postCode: 'postCode',
  city: 'city',
  state: 'state',
  region: 'region',
  countryCode: 'countryCode',
  grossFloorArea: 'grossFloorArea',
  completionYear: 'completionYear',
  majorOrientationId: 'majorOrientationId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  buildingId: 'buildingId',
  floorId: 'floorId',
  zoneId: 'zoneId',
  sustainabilityRatingSchemeId: 'sustainabilityRatingSchemeId',
  sustainabilityRatingId: 'sustainabilityRatingId',
  latitude: 'latitude',
  longitude: 'longitude',
  grossInteriorArea: 'grossInteriorArea',
  netUsableArea: 'netUsableArea',
  useTypeId: 'useTypeId',
  photo: 'photo',
  grossInteriorAreaUnit: 'grossInteriorAreaUnit',
  netUsableAreaUnit: 'netUsableAreaUnit',
  hasMajorRefurbishmentOrExtensionsDone: 'hasMajorRefurbishmentOrExtensionsDone',
  latestYearForRefurbishmentOrExtension: 'latestYearForRefurbishmentOrExtension',
  statusId: 'statusId',
  streetNumber: 'streetNumber',
  streetName: 'streetName',
  editedBy: 'editedBy'
};

exports.Prisma.PropertyUserScalarFieldEnum = {
  id: 'id',
  userAuthUID: 'userAuthUID',
  propertyId: 'propertyId'
};

exports.Prisma.Property_UseTypeScalarFieldEnum = {
  id: 'id',
  useTypeId: 'useTypeId',
  propertyId: 'propertyId'
};

exports.Prisma.R_CoolingLoadRuleOfThumbScalarFieldEnum = {
  id: 'id',
  building_type: 'building_type',
  use: 'use',
  people: 'people',
  lighting: 'lighting',
  equipment: 'equipment'
};

exports.Prisma.R_CorrespondingEfficiencyRatioScalarFieldEnum = {
  id: 'id',
  type: 'type',
  cooling: 'cooling',
  heating: 'heating',
  direct_electric: 'direct_electric'
};

exports.Prisma.R_CountryScalarFieldEnum = {
  id: 'id',
  code: 'code',
  name: 'name'
};

exports.Prisma.R_CountryGridEmissionsScalarFieldEnum = {
  id: 'id',
  country_code: 'country_code',
  co2_emissions: 'co2_emissions'
};

exports.Prisma.R_EfficiencyRatioScalarFieldEnum = {
  id: 'id',
  name: 'name',
  value: 'value',
  description: 'description'
};

exports.Prisma.R_EquipmentTypesScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  parentId: 'parentId'
};

exports.Prisma.R_FlowTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.R_HeatingLoadRuleOfThumbScalarFieldEnum = {
  id: 'id',
  building_type: 'building_type',
  use: 'use',
  heating_tbc: 'heating_tbc'
};

exports.Prisma.R_LightFittingEfficacyScalarFieldEnum = {
  id: 'id',
  light_fitting: 'light_fitting',
  efficacy: 'efficacy'
};

exports.Prisma.R_LightingLoadRuleOfThumbScalarFieldEnum = {
  id: 'id',
  building_type: 'building_type',
  use: 'use',
  lighting_load_tbc: 'lighting_load_tbc'
};

exports.Prisma.R_WallTypeUValueScalarFieldEnum = {
  id: 'id',
  wall_type: 'wall_type',
  u_value: 'u_value'
};

exports.Prisma.R_WindowTypeUValueScalarFieldEnum = {
  id: 'id',
  window_type: 'window_type',
  u_value: 'u_value',
  shading_coefficient: 'shading_coefficient'
};

exports.Prisma.RefrigerantTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.RoofInsulationTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  uValue: 'uValue',
  description: 'description'
};

exports.Prisma.RoofTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.SolarPanelSystemScalarFieldEnum = {
  id: 'id',
  installedCapacity: 'installedCapacity',
  systemLoss: 'systemLoss',
  inclineAngle: 'inclineAngle',
  trackingTypeId: 'trackingTypeId',
  pvTechChoiceId: 'pvTechChoiceId',
  pvSystemTypeId: 'pvSystemTypeId',
  renewableEnergySystem: 'renewableEnergySystem',
  propId: 'propId',
  mountingTypeId: 'mountingTypeId',
  orientationAngle: 'orientationAngle'
};

exports.Prisma.SpaceUsageScalarFieldEnum = {
  id: 'id',
  usageTypeId: 'usageTypeId',
  usagePercentage: 'usagePercentage',
  climateControlId: 'climateControlId',
  propId: 'propId',
  title: 'title',
  fanTypeId: 'fanTypeId',
  hasReheatRecovery: 'hasReheatRecovery'
};

exports.Prisma.SpaceUsageTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  countryCode: 'countryCode',
  coolingLoad: 'coolingLoad',
  heatingLoad: 'heatingLoad',
  mvLoad: 'mvLoad',
  lightingLoad: 'lightingLoad'
};

exports.Prisma.StatusScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.SustainabilityRatingScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description',
  SustainabilityRatingSchemaId: 'SustainabilityRatingSchemaId'
};

exports.Prisma.SustainabilityRatingSchemeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.TrackingTypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.UseTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  description: 'description'
};

exports.Prisma.UserScalarFieldEnum = {
  id: 'id',
  email: 'email',
  password: 'password',
  status: 'status',
  userTypeId: 'userTypeId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt',
  authTypeId: 'authTypeId',
  externalUID: 'externalUID'
};

exports.Prisma.UserDetailScalarFieldEnum = {
  id: 'id',
  companyName: 'companyName',
  firstName: 'firstName',
  lastName: 'lastName',
  userId: 'userId',
  createdAt: 'createdAt',
  updatedAt: 'updatedAt'
};

exports.Prisma.UserTrackingScalarFieldEnum = {
  id: 'id',
  externalId: 'externalId',
  createdAt: 'createdAt',
  pageName: 'pageName'
};

exports.Prisma.UserTypeScalarFieldEnum = {
  id: 'id',
  name: 'name'
};

exports.Prisma.WallInsulationTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  uValue: 'uValue',
  description: 'description'
};

exports.Prisma.WindowInsulationTypeScalarFieldEnum = {
  id: 'id',
  name: 'name',
  uValue: 'uValue',
  shadingCoefficient: 'shadingCoefficient',
  description: 'description'
};

exports.Prisma.ZoneScalarFieldEnum = {
  id: 'id',
  name: 'name',
  floorId: 'floorId',
  buildingId: 'buildingId'
};

exports.Prisma.Nc_evolutionsScalarFieldEnum = {
  id: 'id',
  title: 'title',
  titleDown: 'titleDown',
  description: 'description',
  batch: 'batch',
  checksum: 'checksum',
  status: 'status',
  created: 'created',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.HeatConsumptionScalarFieldEnum = {
  id: 'id',
  heatSupplierId: 'heatSupplierId',
  monthlyCost: 'monthlyCost',
  monthlyValue: 'monthlyValue',
  month: 'month',
  year: 'year',
  propId: 'propId',
  heattype: 'heattype'
};

exports.Prisma.HeatSupplierAPIScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  apiUrl: 'apiUrl',
  apiKey: 'apiKey',
  apiFormat: 'apiFormat',
  heatSupplierInformationId: 'heatSupplierInformationId'
};

exports.Prisma.HeatSupplierAreasScalarFieldEnum = {
  id: 'id',
  supplierId: 'supplierId',
  countryService: 'countryService',
  stateService: 'stateService',
  cityService: 'cityService',
  heatSupplierInformationId: 'heatSupplierInformationId'
};

exports.Prisma.HeatSupplierInformationScalarFieldEnum = {
  id: 'id',
  companyName: 'companyName',
  apiKey: 'apiKey'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};


exports.Prisma.ModelName = {
  AuthType: 'AuthType',
  AverageOperatingHours: 'AverageOperatingHours',
  Building: 'Building',
  BuildingMajorOrientation: 'BuildingMajorOrientation',
  CO2EmissionRate: 'CO2EmissionRate',
  Chiller: 'Chiller',
  ChillerEnergySource: 'ChillerEnergySource',
  ChillerType: 'ChillerType',
  ClimateControl: 'ClimateControl',
  CompressorType: 'CompressorType',
  CoolingHistorizedPoint: 'CoolingHistorizedPoint',
  CoolingSystem: 'CoolingSystem',
  CoolingSystemType: 'CoolingSystemType',
  ElectricityConsumption: 'ElectricityConsumption',
  ElectricitySupplierAPI: 'ElectricitySupplierAPI',
  ElectricitySupplierAreas: 'ElectricitySupplierAreas',
  ElectricitySupplierInformation: 'ElectricitySupplierInformation',
  EquipmentDetail: 'EquipmentDetail',
  Equipments: 'Equipments',
  ExternalEnvelopeSubSystem: 'ExternalEnvelopeSubSystem',
  FanType: 'FanType',
  Floor: 'Floor',
  GroundInsulationType: 'GroundInsulationType',
  Heater: 'Heater',
  HeaterEnergySource: 'HeaterEnergySource',
  HeaterType: 'HeaterType',
  HeatingHistorizedPoint: 'HeatingHistorizedPoint',
  HeatingSystem: 'HeatingSystem',
  HeatingSystemType: 'HeatingSystemType',
  LightingFittingType: 'LightingFittingType',
  LightingHistorizedPoint: 'LightingHistorizedPoint',
  LightingSystem: 'LightingSystem',
  LightingSystemImprovement: 'LightingSystemImprovement',
  MechanicalVentilationHistorizedPoint: 'MechanicalVentilationHistorizedPoint',
  MechanicalVentilationSystem: 'MechanicalVentilationSystem',
  MountingType: 'MountingType',
  OverallHistorizedPoint: 'OverallHistorizedPoint',
  PVSystemType: 'PVSystemType',
  PVTechChoice: 'PVTechChoice',
  Points: 'Points',
  Property: 'Property',
  PropertyUser: 'PropertyUser',
  Property_UseType: 'Property_UseType',
  R_CoolingLoadRuleOfThumb: 'R_CoolingLoadRuleOfThumb',
  R_CorrespondingEfficiencyRatio: 'R_CorrespondingEfficiencyRatio',
  R_Country: 'R_Country',
  R_CountryGridEmissions: 'R_CountryGridEmissions',
  R_EfficiencyRatio: 'R_EfficiencyRatio',
  R_EquipmentTypes: 'R_EquipmentTypes',
  R_FlowType: 'R_FlowType',
  R_HeatingLoadRuleOfThumb: 'R_HeatingLoadRuleOfThumb',
  R_LightFittingEfficacy: 'R_LightFittingEfficacy',
  R_LightingLoadRuleOfThumb: 'R_LightingLoadRuleOfThumb',
  R_WallTypeUValue: 'R_WallTypeUValue',
  R_WindowTypeUValue: 'R_WindowTypeUValue',
  RefrigerantType: 'RefrigerantType',
  RoofInsulationType: 'RoofInsulationType',
  RoofType: 'RoofType',
  SolarPanelSystem: 'SolarPanelSystem',
  SpaceUsage: 'SpaceUsage',
  SpaceUsageType: 'SpaceUsageType',
  Status: 'Status',
  SustainabilityRating: 'SustainabilityRating',
  SustainabilityRatingScheme: 'SustainabilityRatingScheme',
  TrackingType: 'TrackingType',
  UseType: 'UseType',
  User: 'User',
  UserDetail: 'UserDetail',
  UserTracking: 'UserTracking',
  UserType: 'UserType',
  WallInsulationType: 'WallInsulationType',
  WindowInsulationType: 'WindowInsulationType',
  Zone: 'Zone',
  nc_evolutions: 'nc_evolutions',
  HeatConsumption: 'HeatConsumption',
  HeatSupplierAPI: 'HeatSupplierAPI',
  HeatSupplierAreas: 'HeatSupplierAreas',
  HeatSupplierInformation: 'HeatSupplierInformation'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)
