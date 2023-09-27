using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstimadorBM.Models
{
	public class Presupuesto
	{
		public Presupuesto(int iD, string fname, string lname, string email, int phone, string address, DateTime startDate, decimal duration, int persons, string eventType, string drinksString, int menu, decimal min, decimal max)
		{
			ID = iD;
			Fname = fname;
			Lname = lname;
			Email = email;
			Phone = phone;
			Address = address;
			StartDate = startDate;
			Duration = duration;
			Persons = persons;
			EventType = eventType;
			DrinksString = drinksString;
			Drinks = DrinksString.Split(',').Select(int.Parse).ToArray();
			Menu = menu;
			Min = min;
			Max = max;
		}

		public int ID { get; set; }
		public string Fname { get; set; }
		public string Lname { get; set; }
		public string Email { get; set; }
		public int Phone { get; set; }
		public string Address { get; set; }
		public DateTime StartDate { get; set; }
		public decimal Duration { get; set; }
		public int Persons { get; set; }
		public string EventType { get; set; }
		public string DrinksString { get; set; }
		[NotMapped] public int[] Drinks { get; set; }
		public int Menu { get; set; }
		public decimal Min { get; set; }
		public decimal Max { get; set; }

		public string ToParameters()
		{
			string FnameParam = $"@Fname = '{Fname}'";
			string LnameParam = $"@Lname = '{Lname}'";
			string EmailParam = $"@Email = '{Email}'";
			string PhoneParam = $"@Phone = '{Phone}'";
			string AddressParam = $"@Address = '{Address}'";
			string StartDateParam = $"@Startdate = '{StartDate.ToString("s").Replace('T',' ')}'";
			string DurationParam = $"@Duration = '{Duration.ToString().Replace('.',',')}'";
			string PersonsParam = $"@Persons = '{Persons}'";
			string EventTypeParam = $"@EventType = '{EventType}'";
			string DrinksParam = $"@Drinks = '{DrinksString}'";
			string MenuParam = $"@Menu = '{Menu}'";
			string MinParam = $"@Min = '{Min.ToString().Replace('.', ',')}'";
			string MaxParam = $"@Max = '{Max.ToString().Replace('.', ',')}'";

			string res = FnameParam + ", " + LnameParam + ", " + EmailParam + ", " + PhoneParam + ", " 
				+ AddressParam + ", " + StartDateParam + ", " + DurationParam + ", " + PersonsParam + ", " 
				+ EventTypeParam + ", " + MenuParam + ", " + MinParam + ", " + MaxParam + ", " + DrinksParam;
			return res;
		}
	}
}
