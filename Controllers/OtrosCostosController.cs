using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstimadorBM.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class OtrosCostosController : ControllerBase
	{
		public OtrosCostosController(DBOtrosCostosService OtrosCostosService, EstimatorBMContext context)
		{
			this.OtrosCostosService = OtrosCostosService;
			_cotext = context;
		}

		public DBOtrosCostosService OtrosCostosService { get; }

		public EstimatorBMContext _cotext { get; }

		//[HttpGet]
		//public IEnumerable<Carta> Get() => CartaService.GetCartas();

		[HttpGet()]
		public IEnumerable<OtrosCostos> Get() => OtrosCostosService.GetCostos(null);

		[HttpPost]
		public void SetCosto([FromBody] OtrosCostos costo) => OtrosCostosService.SetCosto(costo.Id, costo.Name, costo.Presentacion, costo.Cost, costo.Personas, costo.AmountString, costo.HsString);
		
		[HttpDelete]
		public void DeleteCarta(int id) => OtrosCostosService.DeleteCosto(id);
	}
}
