using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EstimadorBM.Services
{
	public class DBOtrosCostosService
	{

		public DBOtrosCostosService(IWebHostEnvironment hostingEnvironment, EstimatorBMContext context)
		{
			HostingEnvironment = hostingEnvironment;
			this.context = context;
		}

		public EstimatorBMContext context { get; }
		public IWebHostEnvironment HostingEnvironment { get; }


		public IEnumerable<OtrosCostos> GetCostos(string? Id)
		{
			string par = Id.IsNullOrEmpty() ? "" : $"@ID = {Id}";
			var result = context.OtrosCostos.FromSqlRaw($"EXEC [dbo].[Get_OtherCost] {par}").ToArray();
			return result;
		}

		public void SetCosto(int Id, string Name, decimal Presentacion, decimal Cost, decimal Personas, string amountString, string hsString)
		{
			_= context.Database.SqlQueryRaw<int>(
					"EXEC [dbo].[Set_OtherCost] @Id = {0}, @Name = {1}, @Presemtacion = {2}, @Costo = {3}, @Personas = {4}, @AmountString = {5}, @HsString = {6}"
					, Id, Name, Presentacion, Cost, Personas, amountString, hsString
				).ToArray();
		}
	}
}