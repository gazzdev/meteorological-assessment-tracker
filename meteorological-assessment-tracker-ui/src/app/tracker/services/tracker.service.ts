import { HttpClient, HttpEvent, HttpEventType, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { map, tap, last, catchError, mapTo, flatMap } from 'rxjs/operators';
import { AreaDataModel } from '../models/area-data.model';
import { DayLightRecordModel } from '../models/day-light.model';
import { RainfallRecordModel } from '../models/Rainfall.model';
import { TideRecordModel } from '../models/tide.model';
import { WeatherRecordModel } from '../models/weather.model';
import { R3ResolvedDependencyType } from '@angular/compiler';
import { MetaDataModel } from '../models/meta-data.model';
import { CalculateFullResultModel } from '../models/calculate-full-result.model';
@Injectable({
  providedIn: 'root'
})
export class TrackerService {

  calculateWebworker: Worker;

  toDate: Date;
  fromDate: Date

  calculateMessage: string;

  progress: [number, number][] = [];

  data: Observable<AreaDataModel[]>;
  cache: [string, AreaDataModel[], MetaDataModel][];
  metaData: MetaDataModel;

  webworkerInit() {
    if (typeof Worker !== 'undefined') {
      // Create a new
      this.calculateWebworker = new Worker('../web-workers/tracker-calculate.worker', { type: 'module' });
    }
  }

  constructor(private httpClient: HttpClient) {
    this.webworkerInit();
  }

  getAreas(): Observable<string[]> {
    return this.httpClient.get<string[]>("./assets/areas.json");
  }

  getAreaMetaData(area: string): Observable<MetaDataModel> {
    return this.httpClient.get<MetaDataModel>(`./assets/data/${area}/meta-data.json`).pipe(tap((m) => {{
      console.log("meta data", m);
    }}));
  }


  calculateHours(maxWindspeed: number, maxRainfall: number, maxTideHeight: number, daylightOnly: boolean, fromDate: Date, toDate: Date, data: AreaDataModel[]): Promise<CalculateFullResultModel> {

    return new Promise((resolutionFunc, rejectionFunc) => {
      try {
        this.calculateWebworker.postMessage(
          {
            "maxWindspeed": maxWindspeed,
            "maxRainfall": maxRainfall,
            "maxTideHeight": maxTideHeight,
            "daylightOnly": daylightOnly,
            "fromDate": fromDate,
            "toDate": toDate,
            "data": data,
          }

        );
        this.calculateWebworker.onmessage = ({ data }) => {

          if (typeof data === "string") {
            if (data.startsWith("Progress: ")) {
              console.log(data);
              this.calculateMessage = data;
            }
          } else {
            let response: CalculateFullResultModel = data;
            resolutionFunc(response);
          }


        };
      }
      catch (e) {
        rejectionFunc(e);
      }
    });
  }

  getAreaYearData(area: string, year: number): Observable<AreaDataModel[]> {

    let request = new HttpRequest('GET', `./assets/data/${area}/${year}.json`, {
      reportProgress: true
    });

    return this.httpClient.request(request)
      .pipe(
        map((event: HttpEvent<AreaDataModel[]>) => {
          switch (event.type) {
            case HttpEventType.DownloadProgress: {

              let progressEntry = this.progress.find(x=>x[0] === year);
              if(progressEntry){
                console.log("Updating progress", Math.round(100 * event.loaded / event.total));
                progressEntry[1] = Math.round(100 * event.loaded / event.total);
              } else {
                console.log("Pushing progress", Math.round(100 * event.loaded / event.total));
                this.progress.push([year, Math.round(100 * event.loaded / event.total)]);
              }

            //  this.calculateDownloadPercentage();

             // console.log(`Progress ${this.progressValue}`);
            }
            case HttpEventType.Response: {
              if (event.type === HttpEventType.Response) {
                return event.body;
              }
            }
            case HttpEventType.ResponseHeader: {

            }
            case HttpEventType.Sent: {

            }
            case HttpEventType.UploadProgress: {

            }
            case HttpEventType.User: {

            }
            default: {
              console.log(event.type);
            }
          }
        }),
        last(), // return last (completed) message to caller
      );
  }

  // calculateDownloadPercentage() {
  //   const totalArray = this.progress.length;

  //   let sumOfPercentages = 0;

  //   for(const x of this.progress.map(x=>x[1])){
  //     sumOfPercentages = sumOfPercentages + x;
  //   }

  //   let result = (sumOfPercentages / totalArray);
  //   if(isNaN(result)) return 0;
  //   this.progressValue = result;
  // }

  buildAreaData(selectedArea: string): Observable<AreaDataModel[]> {

    if(!this.cache) {
      this.cache = [];
    }

    let cachedVersion = this.cache.find(x=>x[0] === selectedArea);
    if(cachedVersion) {
      let data = cachedVersion[1]; 
      this.metaData = cachedVersion[2];
      this.fromDate = new Date(this.metaData.FirstAvailableDate);
      this.toDate = new Date(this.metaData.LastvailableDate);
      return of(data);
    }


    let dataObservable = this.getAreaMetaData(selectedArea)
    .pipe(flatMap((x) => {

      this.fromDate = new Date(x.FirstAvailableDate);
      this.toDate = new Date(x.LastvailableDate);
      this.metaData = new MetaDataModel();
      this.metaData.AvailableYears = x.AvailableYears;
      this.metaData.FirstAvailableDate = new Date(x.FirstAvailableDate);
      this.metaData.LastvailableDate = new Date(x.LastvailableDate);
      this.metaData.TotalDays = x.TotalDays;
      this.metaData.ValidDataPercentage = x.ValidDataPercentage;
      this.metaData.ValidDays = x.ValidDays;

      this.metaData.InvalidRainfallCount = x.InvalidRainfallCount;
      this.metaData.InvalidTideCount = x.InvalidTideCount;
      this.metaData.InvalidWeatherCount = x.InvalidWeatherCount;

      

      let observables: Observable<AreaDataModel[]>[] = []
      for(const year of x.AvailableYears) {
        observables.push(this.getAreaYearData(selectedArea, year));
      }

      return combineLatest(observables).pipe(map(x => {
        let results: AreaDataModel[] = [];
        for(const d of x) {

          let result = d.map(x=> {
            let areaData = new AreaDataModel();
            areaData.Date = new Date(x.Date);
            areaData.AreaName = x.AreaName;

            areaData.Daylight = x.Daylight;
            areaData.Daylight.Date = new Date(x.Daylight.Date);
            areaData.Daylight.Sunrise = new Date(x.Daylight.Sunrise);
            areaData.Daylight.Sunset = new Date(x.Daylight.Sunset);

            
            areaData.Rainfall = x.Rainfall.map(r=> {
              let rr = new RainfallRecordModel();
              rr.Rainfall = r.Rainfall;
              rr.Timestamp = new Date(r.Timestamp);
              return rr;
            });

            areaData.Tide = x.Tide.map(t=> {
              let tr = new TideRecordModel();
              tr.TideHeight = t.TideHeight;
              tr.Timestamp = new Date(t.Timestamp);
              return tr;
            });

            areaData.Weather = x.Weather.map(w=>{
              let wr = new WeatherRecordModel();
              wr.Pressure = w.Pressure;
              wr.WindDirection = w.WindDirection;
              wr.WindSpeed = w.WindSpeed;
              wr.Timestamp = new Date(w.Timestamp);
              return wr;
            })
            return areaData;
          });

          results.push(... result);
        }
        return results;
      }));

    })).pipe(tap(x => {
      this.cache.push([selectedArea, x, this.metaData]);
      
    }));

    return dataObservable;
  }
}
