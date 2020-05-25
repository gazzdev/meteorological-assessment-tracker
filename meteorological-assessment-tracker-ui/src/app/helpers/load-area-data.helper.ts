import { AreaDataModel } from '../tracker/models/area-data.model';
import { CalculateDayResultModel as CalculateDayResultModel } from '../tracker/models/calculate-day-result.model';
import { CalculateFullResultModel } from '../tracker/models/calculate-full-result.model';

export class LoadAreaDataHelper {

  calculateDay(maxWindspeed: number,
    maxRainfall: number,
    maxTideHeight: number,
    daylightOnly: boolean,
    day: AreaDataModel,
    postMessage: (message: string) => void): CalculateDayResultModel {

    postMessage(`Progress: day ${day.Date}`);

    // filter results by to and from date
    let rainfall = day.Rainfall.filter(x => x.Rainfall <= maxRainfall);
    let tide = day.Tide.filter(x => x.TideHeight <= maxTideHeight && !isNaN(x.TideHeight));
    let wind = day.Weather.filter(x => x.WindSpeed <= maxWindspeed && !isNaN(x.WindSpeed));

    // wind between these times
    if (daylightOnly) {
      wind = wind.filter(x => x.Timestamp >= day.Daylight.Sunrise && x.Timestamp <= day.Daylight.Sunset);
      tide = tide.filter(x => x.Timestamp >= day.Daylight.Sunrise && x.Timestamp <= day.Daylight.Sunset);
      rainfall = rainfall.filter(x => x.Timestamp >= day.Daylight.Sunrise && x.Timestamp <= day.Daylight.Sunset);
    }

    if (rainfall.length > 0 && wind.length > 0 && tide.length > 0) {
      // for each hour in the day
      let hourCount = 0;

      let sunRiseHour = day.Daylight.Sunrise.getHours();
      let sunsetHour = day.Daylight.Sunset.getHours();

      for (let hour = sunRiseHour; hour <= sunsetHour; hour++) {
        let hourWind = wind.filter(x => x.Timestamp.getHours() === hour);
        let hourTide = tide.filter(x => x.Timestamp.getHours() === hour);
        let hourRainfall = rainfall.filter(x => x.Timestamp.getHours() === hour);

        if (hourWind.length > 0 && hourTide.length > 0 && hourRainfall.length > 0) {
          hourCount++;
        }
      }
      let result = new CalculateDayResultModel();
      result.hours = hourCount;
      result.validDayData = true;
      return result;

    }

    let result = new CalculateDayResultModel();
    result.hours = 0;
    result.validDayData = false;
    return result;

   
  }

  calculateHours(
    maxWindspeed: number,
    maxRainfall: number,
    maxTideHeight: number,
    daylightOnly: boolean,
    data: AreaDataModel[],
    postMessage: (message: string) => void): CalculateFullResultModel {

    let dayResults: CalculateDayResultModel[] = [];
    for (let day of data) {
      console.log("web worker working with day", day.Date);

      let dayResult = this.calculateDay(
        maxWindspeed,
        maxRainfall,
        maxTideHeight,
        daylightOnly,
        day,
        postMessage);

        dayResults.push(dayResult);

    }

    var result = new CalculateFullResultModel();
    result.totalDaysInRange = data.length;
    result.validDataDays = dayResults.filter(x=>x.validDayData).length;
    result.percentageOfValidDays = (result.validDataDays / result.totalDaysInRange) * 100;

    let hours = 0;

    for(let result of dayResults.map(x=>x.hours)){
      hours = hours + result;
    }

    result.hours = hours;
    return result;
  }
}