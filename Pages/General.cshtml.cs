using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EstimadorBM.Pages
{
    public class GeneralModel : PageModel
    {
        private readonly ILogger<GeneralModel> _logger;
        public DBCartaService CartaService { get; }
        public DBTragosService TragosService { get; }
        public IEnumerable<Carta> cartas { get; private set; }
        public IEnumerable<Trago> tragos { get; private set; }
        public GeneralModel(ILogger<GeneralModel> logger,
        DBCartaService CartaService,
        DBTragosService TragoService)
        {
            _logger = logger;
            this.CartaService = CartaService;
            this.TragosService = TragoService;
        }

        public void OnGet()
        {
            cartas = CartaService.GetCartas();
            tragos = TragosService.GetTragos();
        }

        public Carta GetCarta(int id) => cartas.Where(x => x.ID == id).First();
        public Trago GetTrago(int id) => tragos.Where(x => x.ID == id).First();
    }
}
