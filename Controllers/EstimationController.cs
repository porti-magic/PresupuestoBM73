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

		[HttpPost]
		public IEnumerable<Estimado> Post([FromBody]EstimationRequest E) => EstimationService.GetEstimation(E.StartDate, E.Duration, E.Pleople, E.EventType, E.MenueID, E.Drinks);
	}
}
