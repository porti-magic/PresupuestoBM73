using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstimadorBM.Models
{
	[Keyless]
	public class FiltersData
	{
		public FiltersData(string FilterName, string FilterValue) { this.FilterName = FilterName; this.FilterValue = FilterValue;}
		public string FilterName { get; set; }
		public string FilterValue { get; set; }

	}
	public class PresupuestoGeneralInfo
	{
		public PresupuestoGeneralInfo(int ID, string Name, string StartDate, string Address, string Menu, string CreateDate, string State)
		{
			this.ID = ID;
			this.Name = Name;
			this.Address = Address;
			this.StartDate = StartDate;
			this.Menu = Menu;
			this.CreateDate = CreateDate;
			this.State = State;
		}

		public int ID { get; set; }
		public string Name { get; set; }
		public string Address { get; set; }
		public string StartDate { get; set; }
		public string Menu { get; set; }
		public string CreateDate { get; set; }
		public string State { get; set; }
	}
}
