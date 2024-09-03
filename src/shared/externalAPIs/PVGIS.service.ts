import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { ISolarPVAnnualEnergyProduction } from '../types/iSolarPVAnnualEnergyProduction';

@Injectable()
export class PVGISService {
  constructor(private httpService: HttpService) {}

  async callAPI(
    lat: any,

    lon: any,

    // peakpower
    peakPower: number | null,

    // pvtechchoice
    pvTechChoice: string | null,

    //mountingplace
    mountingPlace: string | null,

    loss: number | null,

    fixed: number | null,

    angle: number | null,

    aspect: number | string | null,

    // inclined_axis
    inclinedAxis: number | null,

    // inclined_optimum
    inclinedOptimum: number | null,

    // vertical_axis
    verticalAxis: number | null,

    // verticalaxisangle
    verticalAxisAngle: number | null,

    // twoaxis
    twoAxis: number | null
  ): Promise<ISolarPVAnnualEnergyProduction> {
    let apiUrl = 'https://re.jrc.ec.europa.eu/api/PVcalc?';
    // Observable<AxiosResponse<any>>
    if (lat) {
      apiUrl += `lat=${lat}&`;
    }
    if (lon) {
      apiUrl += `lon=${lon}&`;
    }
    if (peakPower) {
      apiUrl += `peakpower=${peakPower}&`;
    }
    if (pvTechChoice) {
      apiUrl += `pvtechchoice=${pvTechChoice}&`;
    }
    if (mountingPlace) {
      apiUrl += `mountingplace=${mountingPlace}&`;
    }
    if (loss) {
      apiUrl += `loss=${loss}&`;
    }
    if (angle) {
      apiUrl += `angle=${angle}&`;
    }
    if (aspect) {
      apiUrl += `aspect=${aspect}&`;
    }
    if (inclinedAxis) {
      apiUrl += `inclined_axis=${inclinedAxis}&`;
    }
    if (inclinedOptimum) {
      apiUrl += `inclinedOptimum=${inclinedAxis}&`;
    }
    if (verticalAxis) {
      apiUrl += `vertical_axis=${verticalAxis}&`;
    }
    if (verticalAxisAngle) {
      apiUrl += `verticalaxisangle=${verticalAxisAngle}&`;
    }
    if (twoAxis) {
      apiUrl += `twoaxis=${twoAxis}&`;
    }

    apiUrl += 'outputformat=json';

    //this.apiUrl += `lat=${lat}&lon=${lon}&peakpower=$&loss=14&outputformat=json`;

    const data$ = this.httpService.get<any>(apiUrl);
    const response = await lastValueFrom(data$);
    // console.log(response.data);

    if (response?.data?.outputs?.totals?.vertical_axis) {
      return {
        averageDailyEnergyProduction: response?.data?.outputs?.totals?.fixed['E_d'],
        averageMonthlyEnergyProduction: response?.data?.outputs?.totals?.fixed['E_m'],
        averageYearlyEnergyProduction: response?.data?.outputs?.totals?.fixed['E_y'],
        averageDailySumOfGlobalIrradiationPerM2: response?.data?.outputs?.totals?.fixed['H(i)_d'],
        averageMonthlySumOfGlobalIrradiationPerM2: response?.data?.outputs?.totals?.fixed['H(i)_m'],
        standardDeviationOfTheMonthlyEnergyProduction: response?.data?.outputs?.totals?.fixed['SD_m'],
      };
    }

    // inputs: {
    //   location: { latitude: 45, longitude: 8, elevation: 250 },
    //   meteo_data: {
    //     radiation_db: 'PVGIS-SARAH',
    //       meteo_db: 'ERA-Interim',
    //       year_min: 2005,
    //       year_max: 2016,
    //       use_horizon: true,
    //       horizon_db: 'DEM-calculated'
    //   },
    //   mounting_system: { fixed: [Object] },
    //   pv_module: { technology: 'c-Si', peak_power: 1, system_loss: 14 },
    //   economic_data: { system_cost: null, interest: null, lifetime: null }
    // },
    // outputs: { monthly: { fixed: [Array] }, totals: { fixed: [Object] } },
    // meta: {
    //   inputs: {
    //     location: [Object],
    //       meteo_data: [Object],
    //       mounting_system: [Object],
    //       pv_module: [Object],
    //       economic_data: [Object]
    //   },
    //   outputs: { monthly: [Object], totals: [Object] }
    // }

    // await data.subscribe({
    //   next(response) {
    //     console.log(response);
    //   },
    //   error(err) {
    //     console.error('Error: ' + err);
    //   },
    //   complete() {
    //     console.log('Completed');
    //   },
    // });
    return null;
  }
}
