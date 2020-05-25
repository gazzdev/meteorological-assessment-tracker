using System;
using System.Collections.Generic;

namespace DataTransformerApi.Models
{
    public class AreaDataModel
    {
        public DateTime Date { get; set; }
        public DaylightModel Daylight { get; set; }
        public List<RainfallModel> Rainfall { get; set; }
        public List<TideModel> Tide { get; set; }
        public List<WeatherModel> Weather { get; set; }
    }
}