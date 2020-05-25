import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { DataTypeContstants } from './constants/data-type.constants';
import { AreaDataModel } from './models/area-data.model';
import { CalculateFullResultModel } from './models/calculate-full-result.model';
import { TrackerService } from './services/tracker.service';

@Component({
  selector: 'app-tracker',
  templateUrl: './tracker.component.html',
  styleUrls: ['./tracker.component.scss']
})
export class TrackerComponent implements OnInit {

  dataTypeConstants: DataTypeContstants;
  selectedArea: string = null;
  selectedAreaData: AreaDataModel;
  calculating = false;
  maxWindSpeed: number = 20;
  daylight: boolean = true;
  maxTideHeight: number = 3;
  maxRainfall: number = 20;
  result: CalculateFullResultModel;
  areas: Observable<string[]>;

  constructor(public trackerService: TrackerService) {
    this.dataTypeConstants = new DataTypeContstants();
    this.areas = trackerService.getAreas();
  }

  ngOnInit(): void {

  }

  parseDate($event: string) {
    return new Date($event);
  }

  async calculate() {
    this.calculating = true;

    this.resetCalc();

    let data = this.trackerService.cache.find(x=>x[0] == this.selectedArea)[1];
    data = data.filter(x=>x.Date >= this.trackerService.fromDate && x.Date <= this.trackerService.toDate);

    let result = await this.trackerService.calculateHours(
      this.maxWindSpeed,
      this.maxRainfall,
      this.maxTideHeight,
      this.daylight,
      this.trackerService.fromDate,
      this.trackerService.toDate,
      data
    );
    this.calculating = false;
    this.result = result;
  }


  async loadAreaData() {
   this.resetCalc();

    this.trackerService.data = this.trackerService.buildAreaData(this.selectedArea);

  }

  resetCalc() {
    this.trackerService.calculateWebworker.terminate();
    this.trackerService.webworkerInit();
    this.trackerService.calculateMessage = "";
    this.trackerService.progress = [];
    this.trackerService.metaData = null;
    this.result = null;
  }


}
