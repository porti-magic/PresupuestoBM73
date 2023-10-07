using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EstimadorBM.Controllers
{
    [Route("[controller]")]
	public class ProveedoresController : Controller
	{
		public ProveedoresController(DBProveedorService ProveedorService, EstimatorBMContext context)
		{
			this.ProveedorService = ProveedorService;
			_context = context;
		}

        public DBProveedorService ProveedorService { get; set; }
        public EstimatorBMContext _context { get; set; }

		[HttpGet]
		public IEnumerable<Proveedor> GetProveedores(int? ID) => ProveedorService.GetProveedores(ID);
    }
}
