using EstimadorBM.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.Extensions.Hosting.Internal;

namespace EstimadorBM.Services
{
	public class DBPresupestoService
	{
		public DBPresupestoService(IWebHostEnvironment hostEnvironment, EstimatorBMContext context)
		{
			this.hostEnvironment = hostEnvironment;
			this.context = context;
		}

		public EstimatorBMContext context { get; set; }
		public IWebHostEnvironment hostEnvironment { get; set; }

		public Presupuesto GetPresupuesto(int id)
		{
			var resul = context.Presupuestos.FromSqlRaw($"EXEC [dbo].[Get_Presupuesto] @Id = {id}").ToArray();

			if (resul.Length == 1)
				return resul[0];
			else if (resul.Length == 0)
				throw new Exception($"Presupuesto {id} no encontrado");
			else
				throw new Exception($"Multiples presupuestos con id {id} encontrados");
		}

		public IEnumerable<PresupuestoGeneralInfo> GetGeneralInfos(string parameters = "")
		{
			
			var res = context.PresupuestoGeneralInfos.FromSqlRaw(
				$"EXEC [dbo].[Get_PresupuestosGeneralInfo] {parameters}");
			return res;
		}

		public IEnumerable<FiltersData> GetFilterData()
		{
			var res = context.FiltersData.FromSqlRaw("EXEC [dbo].[Get_Filters]");
			return res;
		}

		public void UpdatePresupuestoContactInfo(PresupuestoContactInfo contactInfo)
		{
			string parms = $"@Id = {contactInfo.Id}, @Fname = '{contactInfo.fname}', @Lname = '{contactInfo.lname}', @Email = '{contactInfo.email}', @Phone = {contactInfo.phone}, @Address = '{contactInfo.address}'";
			_ = context.Database.SqlQueryRaw<int>($"EXEC [dbo].[Update_PresupuestoContactInfo] {parms}").ToArray();
		}
	}
}
