using System.ComponentModel.DataAnnotations;

namespace EstimadorBM.Models
{
	public class Precio
	{
		[Key]
		public int IngredienteId { get; set; }
		public int ProveedorId { get; set; }
		public string Marca { get; set; }
		public int Presentacion { get; set; }
		public decimal Costo { get; set; }

        public Precio(int IngredienteId, int ProveedorId,string Marca, int Presentacion, decimal Costo)
        {
            this.IngredienteId = IngredienteId;
			this.ProveedorId = ProveedorId;
			this.Marca = Marca;
			this.Presentacion = Presentacion;
			this.Costo = Math.Round(Costo, 2);
        }
    }
}
