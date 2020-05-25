import { DayLightRecordModel } from './day-light.model';
import { TideRecordModel } from './tide.model';
import { RainfallRecordModel } from './Rainfall.model';
import { WeatherRecordModel } from './weather.model';


export class AreaDataModel {
    Date: Date;
    AreaName: string;
    Daylight: DayLightRecordModel;
    Tide: TideRecordModel[];
    Weather: WeatherRecordModel[];
    Rainfall: RainfallRecordModel[];
}
