/// <reference lib="webworker" />

import { LoadAreaDataHelper } from "src/app/helpers/load-area-data.helper";
import { AreaDataModel } from '../models/area-data.model';


addEventListener('message', async ({ data }) => {

  let loadAreaDataHelper = new LoadAreaDataHelper();
  let maxWindspeed: number = data.maxWindspeed; 
  let maxRainfall: number = data.maxRainfall; 
  let maxTideHeight: number = data.maxTideHeight; 
  let daylightOnly: boolean = data.daylightOnly; 
  let areaData: AreaDataModel[] = data.data; 
  
  let result = await loadAreaDataHelper.calculateHours(maxWindspeed, maxRainfall, maxTideHeight, daylightOnly, areaData, postMessage);
  postMessage(result);
});





