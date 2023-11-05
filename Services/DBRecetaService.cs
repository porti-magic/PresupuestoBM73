using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;

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
	}
}