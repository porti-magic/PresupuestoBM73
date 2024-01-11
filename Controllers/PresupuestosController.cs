using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata;
using System.Web;

namespace EstimadorBM.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class PresupuestosController :ControllerBase
	{
		public PresupuestosController(DBPresupestoService PresupuestoService, EstimatorBMContext context)
		{
			this.PresupuestoService = PresupuestoService;
			_cotext = context;
		}

		public DBPresupestoService PresupuestoService { get; }

		public EstimatorBMContext _cotext { get; }

		[HttpGet("/GeneralInfo")]
		public IEnumerable<PresupuestoGeneralInfo> GetGeneralInfos(string parameters) => PresupuestoService.GetGeneralInfos(HttpUtility.UrlDecode(parameters));

		[HttpGet()]
		public Presupuesto Get(int id) => PresupuestoService.GetPresupuesto(id);

		[HttpPost]
		public void CreatePresupuesto([FromBody] PresupuestoContactInfo contactInfo) => PresupuestoService.UpdatePresupuestoContactInfo(contactInfo);


	}
}
