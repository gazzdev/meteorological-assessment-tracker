using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using CsvHelper.Configuration;

namespace DataTransformerApi.Models
{
    public class TideModel
    {
        public DateTime? Timestamp { get; set; }
        public decimal? TideHeight { get; set; }
    }

    public sealed class TideModelMap : ClassMap<TideModel>
    {
        public TideModelMap()
        {
            Map(m => m.Timestamp).Name("Timestamp");
            Map(m => m.TideHeight).Name("Tide_Height");
        }
    }
}
