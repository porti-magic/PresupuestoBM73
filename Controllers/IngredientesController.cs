using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstimadorBM.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class IngredientesController
	{
		public IngredientesController(DBIngredienteService IngredientesService, EstimatorBMContext context)
		{
			this.IngredientesService = IngredientesService;
			_context = context;
		}

		public DBIngredienteService IngredientesService;
		public EstimatorBMContext _context { get; set; }

		[HttpGet]
		public IEnumerable<Ingrediente> GetAll() => IngredientesService.GetIngredientes();
	}
}
