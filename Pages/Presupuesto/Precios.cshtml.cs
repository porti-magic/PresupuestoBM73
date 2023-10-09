using EstimadorBM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EstimadorBM.Pages.Presupuesto
{
	public class PreciosModel : PageModel
	{
		public PreciosModel(ILogger<PreciosModel> logger)
		{
			Logger = logger;
		}

		public readonly ILogger<PreciosModel> Logger;
		public IEnumerable<Ingrediente> ingredientes { get; set; }

		public void OnGet()
		{
		}
	}
}
