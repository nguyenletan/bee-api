import { differenceInMinutes } from 'date-fns';

export class Utilities {
  static getMonthName(month: number): string {
    switch (month) {
      case 1:
        return 'Jan';
      case 2:
        return 'Feb';
      case 3:
        return 'Mar';
      case 4:
        return 'Apr';
      case 5:
        return 'May';
      case 6:
        return 'Jun';
      case 7:
        return 'Jul';
      case 8:
        return 'Aug';
      case 9:
        return 'Sep';
      case 10:
        return 'Oct';
      case 11:
        return 'Nov';
      case 12:
        return 'Dec';
      default:
        return 'Error';
    }
  }

  public static convertFt2ToM2(squareFootNumber: number): number {
    return squareFootNumber * 0.09290304;
  }

  public static subtractTime(time1: string, time2: string): number {
    if (time1 && time2) {
      return differenceInMinutes(
        new Date('2000-01-01T' + time1),
        new Date('2000-01-01T' + time2),
      );
    }
    return 0;
  }

  public static json(param: any): any {
    return JSON.stringify(
      param,
      (key, value) => (typeof value === 'bigint' ? value.toString() : value), // return everything else unchanged
    );
  }
}
