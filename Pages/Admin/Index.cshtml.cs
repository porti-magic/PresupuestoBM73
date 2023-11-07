using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EstimadorBM.Pages.Admin
{
    public class AdminModel : PageModel
    {
        private readonly ILogger<AdminModel> _logger;
        public DBProveedorService DBProveedorService { get; set; }
        public IEnumerable<Proveedor> Proveedores { get; set; }
        public DBTragosService DBTragosService { get; set; }
        public IEnumerable<Trago> Tragos { get; set; }
        public IEnumerable<Ingrediente> Ingredientes { get; set; }
        public DBIngredienteService DBIngredienteService { get; set; }
        public AdminModel(ILogger<AdminModel> logger
            , DBProveedorService dBProveedorService
            , DBTragosService dBTragosService
            , DBIngredienteService ingredienteService)
        {
            _logger = logger;
            DBProveedorService = dBProveedorService;
            DBTragosService = dBTragosService;
            DBIngredienteService = ingredienteService;
        }

        public void OnGet()
        {
            Proveedores = DBProveedorService.GetProveedores(null);
            Tragos = DBTragosService.GetTragos();
            Ingredientes = DBIngredienteService.GetIngredientes();
        }
    }
}
