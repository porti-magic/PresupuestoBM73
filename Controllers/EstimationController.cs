using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstimadorBM.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class EstimationController : Controller
	{
		public EstimationController(DBEstimationService EstimationService, EstimatorBMContext context)
		{
			this.EstimationService = EstimationService;
			_cotext = context;
		}

		public DBEstimationService EstimationService { get; }

		public EstimatorBMContext _cotext { get; }

		//[HttpGet]
		//public IEnumerable<Carta> Get() => CartaService.GetCartas();

		[HttpGet]
		public IEnumerable<Estimado> Get(int pleople, string drinks, decimal Duration) => EstimationService.GetEstimation(pleople, drinks, Duration);
	}
}
