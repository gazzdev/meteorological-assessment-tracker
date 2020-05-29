using System;
using System.Collections.Generic;
using System.Text;

namespace DataTransformerApi.Models
{
    public class FailedModel
    {
        public DateTime? Date { get; set; }
        public string DateType { get; set; }
        public string Reason { get; set; }

    }

}
