using EstimadorBM.Models;
using System.Text.Json;

namespace EstimadorBM.Services
{
    public class JsonFileTragosService
    {
        public JsonFileTragosService(IWebHostEnvironment hostingEnvironment)
        {
            HostingEnvironment = hostingEnvironment;
        }

        public IWebHostEnvironment HostingEnvironment { get; }

        private string JsonFileName
        {
            get { return Path.Combine(HostingEnvironment.WebRootPath, "Data", "Tragos.json"); }
        }

        public IEnumerable<Trago> GetTragos()
        {
            using (var JsonFileReader = File.OpenText(JsonFileName))
            {
                return JsonSerializer.Deserialize<Trago[]>(JsonFileReader.ReadToEnd(),
                    new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

            }
        }
    }
}
