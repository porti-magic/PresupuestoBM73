using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstimadorBM.Models
{
	public class Receta
	{
		[Key]
		public required string TragoNombre { get; set; }
		public required bool Disponible { get; set;}
		public required string ingredientesString { get; set; }
		[NotMapped] public Dictionary<string, decimal> Ingredientes = new();

		public Receta(string tragoNombre, bool disponible, string ingredientesString) 
		{
			this.TragoNombre = tragoNombre;
			Disponible = disponible;
			this.ingredientesString = ingredientesString;
            foreach (var i in this.ingredientesString.Split(","))
            {
				var splited = i.Split(":");
				Ingredientes.Add(splited[0],Convert.ToDecimal(splited[1].Replace(".", ",")));
            }
        }
	}
}
