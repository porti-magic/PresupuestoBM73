using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EstimadorBM.Pages.Presupuesto
{
    public class EditarModel : PageModel
    {
        private readonly ILogger<EditarModel> _logger;
        public DBPresupestoService DBPresupestoService { get; set; }
		public Models.Presupuesto Presupuesto { get; set; }

		public EditarModel(ILogger<EditarModel> logger,
		   DBPresupestoService PresupuestoService)
		{
			_logger = logger;
			DBPresupestoService = PresupuestoService;
		}

		public void OnGet(int id)
        {
			Presupuesto = DBPresupestoService.GetPresupuesto(id);
        }
    }
}
