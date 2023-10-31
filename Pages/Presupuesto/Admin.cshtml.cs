using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EstimadorBM.Pages.Presupuesto
{
    public class AdminModel : PageModel
    {
		private readonly ILogger<AdminModel> _logger;
		public DBProveedorService DBProveedorService { get; set; }
        public IEnumerable<Proveedor> Proveedores { get; set; }
		public DBTragosService DBTragosService { get; set; }
		public IEnumerable<Trago> Tragos { get; set; }
        public AdminModel(ILogger<AdminModel> logger, DBProveedorService dBProveedorService, DBTragosService dBTragosService)
		{
			_logger = logger;
			DBProveedorService = dBProveedorService;
			this.DBTragosService = dBTragosService;
		}

		public void OnGet() 
		{
			Proveedores = DBProveedorService.GetProveedores(null);
			Tragos = DBTragosService.GetTragos();
		}
    }
}
