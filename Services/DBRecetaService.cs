using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;
using System.Runtime.CompilerServices;

namespace EstimadorBM.Services
{
	public class DBRecetaService
	{
		public DBRecetaService(IWebHostEnvironment hostEnvironment, EstimatorBMContext context)
		{
			this.hostEnvironment = hostEnvironment;
			this.context = context;
		}

		public EstimatorBMContext context { get; set; }
		public IWebHostEnvironment hostEnvironment { get; set; }

		public Receta GetReceta(string name)
		{
			var res = context.Recetas.FromSqlRaw($"exec dbo.Get_Receta @name = {name}").ToArray();
			return res.Single();
		}

		public void UpdateReceta(string tragoNombre, bool disponible, string[] ingredientesNombres, decimal[] ingredientesCantidades)
		{
			string cantidades = ingredientesCantidades[0].ToString().Replace(",", ".");
            foreach (var c in ingredientesCantidades.Skip(1))
            {
				cantidades += "," + c.ToString().Replace(",", "."); 
            }
            string param = $"@nombre = '{tragoNombre}', @disponible = {(disponible? 1 : 0)}, @ingredientes = '{string.Join(",", ingredientesNombres)}', @cantidades = '{cantidades}'";

			_ =context.Database.SqlQueryRaw<int>($"exec dbo.Set_Receta {param}").ToArray();
		}

		public void DeleteReceta(object id)
		{
			_ = context.Database.SqlQueryRaw<int>($"exec dbo.Delete_Trago @id={id}").ToArray();
		}
	}
}