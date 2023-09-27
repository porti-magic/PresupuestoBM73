using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Services
{
	public class DBCartaService
	{
		public DBCartaService(IWebHostEnvironment hostingEnvironment, EstimatorBMContext context)
		{
			HostingEnvironment = hostingEnvironment;
			_context = context;
		}

		public EstimatorBMContext _context { get; }
		public IWebHostEnvironment HostingEnvironment { get; }

		public IEnumerable<Carta> GetCartas()
		{
			var resul =  _context.Cartas.FromSqlRaw("EXEC Get_Cartas_Data").ToArray();
			return resul;
		}
	}
}
