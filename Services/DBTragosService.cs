using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Services
{
	public class DBTragosService
	{
		public DBTragosService(IWebHostEnvironment hostingEnvironment, EstimatorBMContext context)
		{
			HostingEnvironment = hostingEnvironment;
			_context = context;
		}

		public EstimatorBMContext _context { get; }
		public IWebHostEnvironment HostingEnvironment { get; }

		public IEnumerable<Trago> GetTragos()
		{
			var resul = _context.Tragos.ToArray();
			return resul;
		}

		public void SetStatus(int id, bool status)
		{
			_ = _context.Database.SqlQueryRaw<int>($"exec dbo.Set_TragoStatus @id={id}, @status={status}").ToArray();
		}
	}
}
