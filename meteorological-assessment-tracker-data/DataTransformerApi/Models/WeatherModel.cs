using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using CsvHelper.Configuration;

namespace DataTransformerApi.Models
{
    public class WeatherModel
    {
        public DateTime? Timestamp { get; set; }
        public decimal? WindDirection { get; set; }
        public decimal? WindSpeed { get; set; }
        public decimal? Pressure { get; set; }
    }

    public sealed class WeatherModelMap : ClassMap<WeatherModel>
    {
        public WeatherModelMap()
        {
            Map(m => m.Timestamp).Name("Timestamp");
            Map(m => m.WindDirection).Name("Wind_Direction");
            Map(m => m.WindSpeed).Name("Wind_Speed");
            Map(m => m.Pressure).Name("Pressure");
        }
    }
}
