using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;
using CsvHelper.Configuration;

namespace DataTransformerApi.Models
{
    public class DaylightModel
    {
        public DateTime? Date { get; set; }
        public DateTime? Sunrise { get; set; }
        public DateTime? Sunset { get; set; }
    }

    public sealed class DaylightModelMap : ClassMap<DaylightModel>
    {
        public DaylightModelMap()
        {
            Map(m => m.Date).Name("Date");
            Map(m => m.Sunrise).Name("Sunrise");
            Map(m => m.Sunset).Name("Sunset");
        }
    }
}
