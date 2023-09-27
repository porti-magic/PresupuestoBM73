using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EstimadorBM.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class TragosController : ControllerBase
    {
        public TragosController(DBTragosService TragosService, EstimatorBMContext context)
        {
            this.TragosService = TragosService;
            this.Context = context;
        }

        public DBTragosService TragosService { get; }
        public EstimatorBMContext Context { get; }

        [HttpGet]
        public IEnumerable<Trago> Get() => TragosService.GetTragos();
    }
}
