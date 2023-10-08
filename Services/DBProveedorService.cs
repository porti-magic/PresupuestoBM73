using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Services
{
	public class DBProveedorService
	{
		public DBProveedorService(IWebHostEnvironment hostEnvironment, EstimatorBMContext context)
		{
			this.hostEnvironment = hostEnvironment;
			this.context = context;
		}

		public EstimatorBMContext context { get; set; }
		public IWebHostEnvironment hostEnvironment { get; set; }

		internal void CreateProveedor(string name, string email, int? phone)
		{
			var param = $"@Name = '{name}', @Email = '{email}', @phone = {phone}";
			var query = $"EXEC [dbo].[Create_Proveedor] {param}";
			var res = context.Database.SqlQueryRaw<int>(query).ToArray();
		}

		internal IEnumerable<Proveedor> GetProveedores(int? ID)
		{
			string parameters =(ID != null) ? ("@ID = " + ID) : string.Empty;
			var res = context.Proveedores.FromSqlRaw(
				$"EXEC [dbo].[Get_Proveedor] {parameters}");
			return res;
		}
	}
}