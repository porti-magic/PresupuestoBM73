using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Services
{
	public class DBEstimationService
	{
		public DBEstimationService(IWebHostEnvironment hostingEnvironment, EstimatorBMContext context)
		{
			HostingEnvironment = hostingEnvironment;
			_context = context;
		}

		public EstimatorBMContext _context { get; }
		public IWebHostEnvironment HostingEnvironment { get; }

		public IEnumerable<Estimado> GetEstimation(DateTime StartDate, decimal Duration, int Pleople, string EventType, int MenueID, string Drinks)
		{
			string parameters = 
				$"@Startdate = '{StartDate.ToString("s").Replace('T', ' ')}', @Duration = '{Duration.ToString().Replace(',', '.')}', @Persons = '{Pleople}', " +
				$"@EventType = '{EventType}', @Menu = '{MenueID}', @Drinks = '{Drinks}'";
			var resul = _context.Estimado.FromSqlRaw($"EXEC [dbo].[Create_PresupuestoNew] {parameters}").ToArray();
			return resul;
		}
	}
}
