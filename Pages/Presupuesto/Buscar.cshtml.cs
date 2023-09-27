using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Dynamic;

namespace EstimadorBM.Pages.Presupuesto
{
    public class BuscarModel : PageModel
    {
		private readonly ILogger<BuscarModel> _logger;
        public DBPresupestoService DBPresupestoService { get; set; }
		public IEnumerable<PresupuestoGeneralInfo> Presupuestos { get; set; }
        public IEnumerable<FiltersData> Filtersdata { get; set; }
        public Dictionary<string, List<string>> Filters { get; set; } = new Dictionary<string, List<string>>();
        public BuscarModel(ILogger<BuscarModel> logger,
            DBPresupestoService PresupuestoService)
        {
            _logger = logger;
            DBPresupestoService = PresupuestoService;
        }

        public void OnGet()
        {
            Presupuestos = DBPresupestoService.GetGeneralInfos();
			Filtersdata = DBPresupestoService.GetFilterData();
            foreach (var filter in Filtersdata)
            {
                if (Filters.ContainsKey(filter.FilterName))
                    Filters[filter.FilterName] = Filters[filter.FilterName].Append(filter.FilterValue).ToList();
                else
                    Filters.Add(filter.FilterName, new[]{ filter.FilterValue}.ToList());
            }
        }
    }
}
