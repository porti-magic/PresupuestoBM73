using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Models
{
	[Keyless]
	public class Ingrediente
	{
		public Ingrediente(int id, string name) 
		{
			this.id = id;
			this.name = name;
		}

        public int id { get; set; }
		public string name { get; set; }
    }
}
