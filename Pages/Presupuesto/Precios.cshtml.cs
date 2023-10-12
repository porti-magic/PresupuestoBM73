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
			DBProveedorService dBProveedorService,
			DBPrecioService dBPrecioService)
		{
			Logger = logger;
			DBIngredienteService = ingredienteService;
			DBProveedorService = dBProveedorService;
			DBPrecioService = dBPrecioService;
		}

		public readonly ILogger<PreciosModel> Logger;
		public IEnumerable<Ingrediente> ingredientes { get; set; }
		public IEnumerable<Precio> precios { get; set; }
		public DBIngredienteService DBIngredienteService { get; set; }
		public DBProveedorService DBProveedorService { get; set; }
		public DBPrecioService DBPrecioService { get; set; }
		public string ProveedorName;
		public string test = "lalal";
		public void OnGet(int proveedorId)
		{
			ingredientes = DBIngredienteService.GetIngredientes();
			ProveedorName = DBProveedorService.GetProveedores(proveedorId).First().Nombre;
			precios = DBPrecioService.GetPrecios(proveedorId);
			
		}

		public string GetIngridientName(int id) => ingredientes.Single(x => x.id == id).name;
	}
}
