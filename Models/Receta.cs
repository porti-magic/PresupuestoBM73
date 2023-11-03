namespace EstimadorBM.Models
{
	public class Receta
	{
		public required string TragoNombre { get; set; }
		public required bool Disponible { get; set;}
		public required string[] IngredientesNombres { get; set; }
		public required decimal[] IngredientesCantidades { get; set; }
	}
}
