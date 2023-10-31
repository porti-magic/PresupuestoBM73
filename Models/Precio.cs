using Microsoft.Extensions.Hosting;
using System.ComponentModel.DataAnnotations;

namespace EstimadorBM.Models
{
	public class Precio
	{
		[Key]
		public string IngredienteName { get; set; }
		public int ProveedorId { get; set; }
		public string Marca { get; set; }
		public int Presentacion { get; set; }
		public decimal Costo { get; set; }
		public bool IsNew { get; set; }

		public Precio(string IngredienteName, int ProveedorId, string Marca, int Presentacion, decimal Costo, bool isNew)
		{
			this.IngredienteName = IngredienteName;
			this.ProveedorId = ProveedorId;
			this.Marca = Marca;
			this.Presentacion = Presentacion;
			this.Costo = Math.Round(Costo, 2);
			IsNew = isNew;
		}

		public Dictionary<string, string> ToParam() => new()
			{{"@IngredienteName", IngredienteName },
				{"@ProveedorId", ProveedorId.ToString()},
				{"@Marca", Marca},
				{"@Presentacion", Presentacion.ToString()},
				{"@Costo", Costo.ToString()},
				{"@IsNew", IsNew.ToString()}};
	}
}
