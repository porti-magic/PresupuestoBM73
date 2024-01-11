using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstimadorBM.Models
{

	public class Estimado
	{
		public int Id { get; set; }
		public decimal Min { get; set; }
		public decimal Max { get; set; }

    }

	public class EstimationRequest
	{
		public DateTime StartDate { get; set; }
		public decimal Duration { get; set; }
		public int Pleople { get; set; }
		public string EventType { get; set; }
		public int MenueID { get; set; }
		public string Drinks { get; set; }

		public EstimationRequest(DateTime StartDate, decimal Duration, int Pleople, string EventType, int MenueID, string Drinks)
		{
			this.StartDate = StartDate;
			this.Duration = Duration;
			this.Pleople = Pleople;
			this.EventType = EventType;
			this.MenueID = MenueID;
			this.Drinks = Drinks;
		}
	}
}
