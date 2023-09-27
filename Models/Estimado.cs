using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations.Schema;

namespace EstimadorBM.Models
{
	[Keyless]
	public class Estimado
	{
		public decimal Min { get; set; }
		public decimal Max { get; set; }

    }
}
