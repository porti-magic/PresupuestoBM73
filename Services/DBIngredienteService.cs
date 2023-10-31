using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Services
{
	public class DBIngredienteService
	{
		public DBIngredienteService(IWebHostEnvironment hostEnvironment, EstimatorBMContext context)
		{
			this.hostEnvironment = hostEnvironment;
			this.context = context;
		}

		public EstimatorBMContext context { get; set; }
		public IWebHostEnvironment hostEnvironment { get; set; }

		public IEnumerable<Ingrediente> GetIngredientes() 
		{
			var res = context.Ingredientes.FromSqlRaw("EXEC [dbo].[Get_Ingredientes]").ToArray();
			return res;
		}
	}
}
