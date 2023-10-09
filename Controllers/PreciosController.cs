using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;

namespace EstimadorBM.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class PreciosController
	{
		public PreciosController(DBPrecioService precioService, EstimatorBMContext context)
		{
			this.precioService = precioService;
			_context = context;
		}

		public DBPrecioService precioService;
		public EstimatorBMContext _context { get; set; }

		[HttpGet]
		public IEnumerable<Precio> GetAll(int proveedorId) => precioService.GetPrecios(proveedorId);
	}
}
