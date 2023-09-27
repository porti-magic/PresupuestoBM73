using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;

namespace EstimadorBM.Models
{
	public class Carta
	{
        public required int ID { get; set; }	
		public required string Name { get; set; }
		[NotMapped] public int[] Drinks { get; set; }
		public required string DrinksString { get; set; }

        public Carta(int ID,string name, string drinksString)
        {
			this.ID = ID;
			this.Name = name;
			this.DrinksString = drinksString;
			Drinks = DrinksString.Split(',').Select(int.Parse).ToArray();
		}
        public override string ToString() => JsonSerializer.Serialize(this);
	}
}
