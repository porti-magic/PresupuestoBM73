using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using System.Web;

namespace EstimadorBM.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class RecetasController : ControllerBase
	{
		public RecetasController(DBRecetaService RecetaService, EstimatorBMContext context)
		{
			this.RecetaService = RecetaService;
			_cotext = context;
		}

		public EstimatorBMContext _cotext { get; }
		public DBRecetaService RecetaService;

		[HttpPost]
		public void UpdateReceta([FromBody] Receta receta) => RecetaService.UpdateReceta(receta.TragoNombre, receta.Disponible, receta.Ingredientes.Keys.ToArray(), receta.Ingredientes.Values.ToArray());

		[HttpGet]
		public Receta GetReceta(string name) => RecetaService.GetReceta(name);

		[HttpDelete]
		public void DeleteReceta(int Id) => RecetaService.DeleteReceta(Id);
	}
}

