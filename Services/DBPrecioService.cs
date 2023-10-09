using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Services
{
	public class DBPrecioService
	{
		public DBPrecioService(IWebHostEnvironment hostEnvironment, EstimatorBMContext context)
		{
			this.hostEnvironment = hostEnvironment;
			this.context = context;
		}

		public EstimatorBMContext context { get; set; }
		public IWebHostEnvironment hostEnvironment { get; set; }

		public IEnumerable<Precio> GetPrecios(int ProveedorId)
		{
			var res = context.precios.FromSqlRaw($"EXEC [dbo].[Get_Precios] @id= {ProveedorId}").ToArray();
			return res;
		}

	}
}
