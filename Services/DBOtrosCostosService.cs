using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
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

		public void SetCosto(int Id, string Name, decimal Presentacion, decimal Cost, bool isActive, decimal Personas, string amountString, string hsString)
		{
			_= context.Database.SqlQueryRaw<int>(
					"EXEC [dbo].[Set_OtherCost] @Id = {0}, @Name = {1}, @Presentacion = {2}, @Cost = {3}, @IsActive = {4}, @Personas = {5}, @AmountString = {6}, @HsString = {7}"
					, Id, Name, Presentacion, Cost, isActive, Personas, amountString, hsString
				).ToArray();
		}

		internal void DeleteCosto(int Id)
		{
			_ = context.Database.SqlQueryRaw<int>("EXEC [dbo].[Delete_OtherCost] @Id = {0}", Id).ToArray();
		}

		internal void SetStatus(int id, bool isActive)
		{
			_ = context.Database.SqlQueryRaw<int>("EXEC [dbo].[Set_OtherCostStatus] @Id = {0}, @IsActive = {1}", id, isActive).ToArray();
		}
	}
}