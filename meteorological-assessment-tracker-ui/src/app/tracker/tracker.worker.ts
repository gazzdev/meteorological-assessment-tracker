// /// <reference lib="webworker" />


// import { AreaDataModel } from './models/area-data.model';
// import { LoadAreaDataHelper } from '../helpers/load-area-data.helper';


// addEventListener('message', async ({ data }) => {

//   let loadAreaDataHelper = new LoadAreaDataHelper();
//   let area: string = data.area; 
//   let baseUrl: string = data.baseUrl; 
//   let rainfall = await loadAreaDataHelper.loadRainfallData(baseUrl, area);
//   let tide = await loadAreaDataHelper.loadTideData(baseUrl, area);
//   let wind = await loadAreaDataHelper.loadWindData(baseUrl, area);
//   let daylight = await loadAreaDataHelper.loadDayLightData(baseUrl, area);

//   let response = new AreaDataModel();
//   response.areaName = area;
//   response.dayLight = daylight;
//   response.rainfall = rainfall;
//   response.tide = tide;
//   response.weather = wind;

//   postMessage(response);
// });





