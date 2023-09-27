using EstimadorBM.Controllers;
using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Reflection;

namespace EstimadorBM.Pages;

public class IndexModel : PageModel
{
    private readonly ILogger<IndexModel> _logger;
    public DBCartaService CartaService { get; }
    public CartasController CartasController { get; }
    public DBTragosService TragosService { get; }
    public IEnumerable<Carta> cartas { get; private set; }
    public IEnumerable<Trago> tragos { get; private set; }
    public EstimatorBMContext db { get; private set; }

    public IndexModel(ILogger<IndexModel> logger,
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
    public Trago GetTrago(int id) => tragos.Where(x=>x.ID == id).First();
}
