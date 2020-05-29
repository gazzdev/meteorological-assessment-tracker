using System;
using System.Collections.Generic;
using System.Text;

namespace DataTransformerApi.Models
{
    public class MetaDataModel
    {
        public int TotalDays { get; set; }
        public int ValidDays { get; set; }
        public int[] AvailableYears { get; set; }
        public DateTime FirstAvailableDate { get; set; }
        public DateTime LastvailableDate { get; set; }

        public decimal ValidDataPercentage => ((decimal) ValidDays / TotalDays) * 100;

        public int InvalidRainfallCount { get; set; }
        public int InvalidTideCount { get; set; }
        public int InvalidWeatherCount { get; set; }
    }
}
