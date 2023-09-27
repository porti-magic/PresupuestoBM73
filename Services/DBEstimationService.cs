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

		public IEnumerable<Estimado> GetEstimation(int Pleople, string Drinks, decimal Duration)
		{
			string parameters = $"@Personas = {Pleople}, @Drinks = '{Drinks}', @Duration = {Duration.ToString().Replace(',','.')}";
			var resul = _context.Estimado.FromSqlRaw($"EXEC [dbo].[Get_Estimate] {parameters}").ToArray();
			return resul;
		}
	}
}
