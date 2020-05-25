﻿using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http.Headers;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
using CsvHelper;
using DataTransformerApi.Models;
using System.Text.Json;
using Directory = System.IO.Directory;


namespace DataTransformerApi
{
    public class MetAssessmentTrackerDataTransformer
    {

        public const string RainfallFileName = "Rainfall.txt";
        public const string DaylightFileName = "Daylight.txt";
        public const string TideFileName = "Tide.txt";
        public const string WeatherFileName = "Weather.txt";

        public void TransformAllData(string source, string destination)
        {
            var areaFolders = Directory.GetDirectories(source);
             //areaFolders = areaFolders.Where(x => x.Contains("Barmouth")).ToArray();
            Parallel.ForEach(areaFolders, (areaFolder) =>
            {
                Console.WriteLine($"Starting {areaFolder}");
                
                var task = TransformAreaData(areaFolder, destination);

                Task.WaitAll(task);

                Console.WriteLine($"Finished {areaFolder}");
            });
            Console.WriteLine("Finished");
        }

        public async Task TransformAreaData(string areaFolder, string destination)
        {
            var areaName = Path.GetFileName(areaFolder);

            if (string.IsNullOrEmpty(areaName))
            {
                throw new Exception("Can't find area name");
            }

            var daylight = LoadAreaData<DaylightModel>(areaFolder, DaylightFileName).ToList();
            daylight = daylight.Where(x => x.Date.HasValue && x.Sunrise.HasValue && x.Sunset.HasValue).ToList();

            var rainfall = LoadAreaData<RainfallModel>(areaFolder, RainfallFileName).ToList();
            rainfall = rainfall.Where(x => x.Timestamp.HasValue && x.Rainfall.HasValue).ToList();

            var tide = LoadAreaData<TideModel>(areaFolder, TideFileName).ToList();
            tide = tide.Where(x => x.TideHeight.HasValue && x.Timestamp.HasValue).ToList();

            var weather = LoadAreaData<WeatherModel>(areaFolder, WeatherFileName).ToList();
            weather = weather.Where(x =>
                    x.Pressure.HasValue && x.Timestamp.HasValue && x.WindDirection.HasValue && x.WindSpeed.HasValue)
                .ToList();


            var concurrentBag = new ConcurrentBag<AreaDataModel>();
            Parallel.ForEach(daylight, new ParallelOptions()
            {
                MaxDegreeOfParallelism = -1
            }, (day) =>
            {
                if (!day.Date.HasValue) return;
                Console.WriteLine($"${areaFolder} {day.Date.Value.ToShortDateString()}");

                var dayLight = daylight.Find(x => x.Date == day.Date);

                if (!dayLight.Sunrise.HasValue || !dayLight.Sunset.HasValue) return;

                var data = new AreaDataModel
                {
                    Date = day.Date.Value,
                    Daylight = new DaylightModel()
                    {
                       Date = day.Date,
                       Sunrise = new DateTime(day.Date.Value.Year, day.Date.Value.Month, day.Date.Value.Day, dayLight.Sunrise.Value.Hour, dayLight.Sunrise.Value.Minute, dayLight.Sunrise.Value.Second),
                       Sunset = new DateTime(day.Date.Value.Year, day.Date.Value.Month, day.Date.Value.Day, dayLight.Sunset.Value.Hour, dayLight.Sunset.Value.Minute, dayLight.Sunset.Value.Second),
                    },
                    Rainfall = rainfall.Where(x => x.Timestamp.HasValue && x.Timestamp.Value.Date == day.Date.Value.Date).ToList(),
                    Tide = tide.Where(x => x.Timestamp.HasValue && x.Timestamp.Value.Date == day.Date.Value.Date).ToList(),
                    Weather = weather.Where(x => x.Timestamp.HasValue && x.Timestamp.Value.Date == day.Date.Value.Date).ToList()
                };

                concurrentBag.Add(data);
            });


            //var results = daylight.AsParallel().Select(day => new AreaDataModel
            //{
            //    Date = day.Date ?? DateTime.MinValue,
            //    Rainfall = rainfall.Find(x => x.Timestamp == day.Date),
            //    Daylight = daylight.Find(x => x.Date == day.Date),
            //    Tide = tide.Find(x => x.Timestamp == day.Date),
            //    Weather = weather.Find(x => x.Timestamp == day.Date)
            //}).ToList();

            var results = concurrentBag.Where(
                x => x.Daylight != null && x.Tide.Any() && x.Rainfall.Any() && x.Weather.Any()).OrderBy(x=>x.Date).ToList();


            var years = results.Select(x => x.Date.Year).Distinct().ToArray();

            foreach (var year in years)
            {
                var yearResults = results.Where(x => x.Date.Year == year).ToList();

                try
                {
                    await SaveAsJson(yearResults, Path.Combine(destination, areaName, Path.GetFileName($"{year}.json")));

                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex);
                }
                    
            }


            // calculate meta data
            var metaData = new MetaDataModel
            {
                TotalDays = daylight.Count, ValidDays = results.Count, AvailableYears = years,
                FirstAvailableDate = results.First().Date,
                LastvailableDate = results.Last().Date
            };
            await SaveAsJson(metaData, Path.Combine(destination, areaName, Path.GetFileName($"meta-data.json")));

            //await SaveAsJson(daylight, Path.Combine(destination, areaName, Path.GetFileName("daylight.json")));
            //await SaveAsJson(rainfall, Path.Combine(destination, areaName, Path.GetFileName("rainfall.json")));
            //await SaveAsJson(tide, Path.Combine(destination, areaName, Path.GetFileName("tide.json")));
            //await SaveAsJson(weather, Path.Combine(destination, areaName,  Path.GetFileName("weather.json")));
        }

        public async Task SaveAsJson<T>(T data, string filePath)
        {
            try
            {
                var folderPath = Path.GetDirectoryName(filePath);

                if (string.IsNullOrEmpty(folderPath))
                {
                    throw new Exception($"Directory for {filePath} can't be calculated from path");
                }

                var folderExists = Directory.Exists(folderPath);
                if (!folderExists)
                {
                    Directory.CreateDirectory(folderPath);
                }

                await using var fs = File.Create(filePath);
                await JsonSerializer.SerializeAsync(fs, data);
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
            }
           

        }

        private static List<T> LoadAreaData<T>(string areaFolderDirectory, string dataFileName)
        {
            var dayLightPath = Path.Combine(areaFolderDirectory, Path.GetFileName(dataFileName));

            using var reader = new StreamReader(dayLightPath);
            using var csv = new CsvReader(reader, new CultureInfo("en-gb"));
            csv.Configuration.TypeConverterOptionsCache.GetOptions<decimal?>().NullValues.Add("NaN");
            csv.Configuration.RegisterClassMap<WeatherModelMap>();
            csv.Configuration.RegisterClassMap<TideModelMap>();
            csv.Configuration.RegisterClassMap<RainfallModelMap>();
            csv.Configuration.RegisterClassMap<DaylightModelMap>();


            var records = csv.GetRecords<T>().ToList();
            return records;
        }


    }
}
