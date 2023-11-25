using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstimadorBM.Models
{
	public class OtrosCostos
	{
		[Key]
		public int Id { get; set; }
		public string Name { get; set; }
		public decimal Presentacion { get; set; }
		public decimal Cost { get; set; }
		[NotMapped]
		public bool IsActive { get; set; }
		public decimal Personas { get; set; }
		public string AmountString { get; set; }
		public string HsString { get; set; }
		[NotMapped]
		public  Dictionary<decimal, decimal> AmountByHs { get; set; }

		public OtrosCostos(int Id, string Name, decimal Presentacion, decimal Cost, decimal Personas, string AmountString, string HsString)
		{
			this.Id = Id;
			this.Name = Name;
			this.Presentacion = Presentacion;
			this.Cost = Math.Round(Cost,2);
			this.Personas = Personas;
			this.AmountString = AmountString;
			this.HsString = HsString;

			AmountByHs = new Dictionary<decimal, decimal>();
			for(int i = 0; i < this.AmountString.Split(',').Length; i++) 
			{
				AmountByHs.Add(Convert.ToDecimal(this.HsString.Split(',')[i]), Convert.ToDecimal(this.AmountString.Split(',')[i]));
			}
		}
	}
}
