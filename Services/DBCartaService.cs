using EstimadorBM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Services
{
	public class DBCartaService
	{
		public DBCartaService(IWebHostEnvironment hostingEnvironment, EstimatorBMContext context)
		{
			HostingEnvironment = hostingEnvironment;
			_context = context;
		}

		public EstimatorBMContext _context { get; }
		public IWebHostEnvironment HostingEnvironment { get; }

		public IEnumerable<Carta> GetCartas()
		{
			var resul = _context.Cartas.FromSqlRaw("EXEC Get_Cartas_Data").ToArray();
			return resul;
		}

		public void SetCarta(int iD, string name, string drinksString)
		{
			string par = $"@ID = '{iD}', @Name = '{name}', @DrinksString = '{drinksString}'";
			_ = _context.Database.SqlQueryRaw<int>($"EXEC [dbo].[Set_Carta] {par}").ToArray(); 
		}

		public void DeleteCarta(int id) 
		{
			_ = _context.Database.SqlQueryRaw<int>($"EXEC [dbo].[Delete_Carta] @ID = {id}").ToArray();
		} 
	}
}
