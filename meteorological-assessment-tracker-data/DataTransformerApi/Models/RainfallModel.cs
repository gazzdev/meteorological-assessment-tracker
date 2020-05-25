using System;
using System.Text.Json.Serialization;
using CsvHelper.Configuration;

namespace DataTransformerApi.Models
{
    public class RainfallModel
    {
        public DateTime? Timestamp { get; set; }
        public decimal? Rainfall { get; set; }
    }

    public sealed class RainfallModelMap : ClassMap<RainfallModel>
    {
        public RainfallModelMap()
        {
            Map(m => m.Timestamp).Name("Timestamp");
            Map(m => m.Rainfall).Name("Rainfall");
        }
    }
}