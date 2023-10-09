using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EstimadorBM.Pages.Presupuesto
{
	public class PreciosModel : PageModel
	{
		public PreciosModel(ILogger<PreciosModel> logger,
			DBIngredienteService ingredienteService,
			DBProveedorService dBProveedorService)
		{
			Logger = logger;
			DBIngredienteService = ingredienteService;
			DBProveedorService = dBProveedorService;
		}

		public readonly ILogger<PreciosModel> Logger;
		public IEnumerable<Ingrediente> ingredientes { get; set; }
		public DBIngredienteService DBIngredienteService { get; set; }
		public DBProveedorService DBProveedorService { get; set; }
		public string ProveedorName;

		public void OnGet(int proveedorId)
		{
			ingredientes = DBIngredienteService.GetIngredientes();
			ProveedorName = DBProveedorService.GetProveedores(proveedorId).First().Nombre;
		}
	}
}
