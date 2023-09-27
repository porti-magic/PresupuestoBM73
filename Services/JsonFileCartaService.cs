using EstimadorBM.Models;
using System.Reflection.Metadata.Ecma335;
using System.Runtime.InteropServices.Marshalling;
using System.Text.Json;

namespace EstimadorBM.Services
{
	public class JsonFileCartaService
	{
		public JsonFileCartaService(IWebHostEnvironment hostingEnvironment)
		{
			HostingEnvironment = hostingEnvironment;
		}

		public IWebHostEnvironment HostingEnvironment { get; }

		private string JsonFileName
		{
			get { return Path.Combine(HostingEnvironment.WebRootPath, "Data", "Cartas.json"); }
		}

		public IEnumerable<Carta> GetCartas()
		{
			using (var JsonFileReader = File.OpenText(JsonFileName))
			{
				return JsonSerializer.Deserialize<Carta[]>(JsonFileReader.ReadToEnd(),
					new JsonSerializerOptions { PropertyNameCaseInsensitive = true });

			}
		}
	}
}
