using System;
using System.Threading.Tasks;
using DataTransformerApi;

namespace DataTransformer
{
    class Program
    {
        static async Task Main(string[] args)
        {
            Console.WriteLine("Meteorological assessment tracker data creater");
            Console.WriteLine("Converts csv data into json");
            Console.WriteLine("Please enter path source path: (default = C:\\temp\\met-data)");
            var sourcePath = Console.ReadLine();
            if (string.IsNullOrEmpty(sourcePath))
                sourcePath = @"c:\temp\met-data";

            Console.WriteLine("Please enter destination path: (default = C:\\temp\\meta-data-json)");

            var destinationPath = Console.ReadLine();
            if (string.IsNullOrEmpty(destinationPath))
                destinationPath = @"c:\temp\met-data-json";

            var metAssessmentTrackerData = new MetAssessmentTrackerDataTransformer();
            metAssessmentTrackerData.TransformAllData(sourcePath, destinationPath);


        }
    }
}
