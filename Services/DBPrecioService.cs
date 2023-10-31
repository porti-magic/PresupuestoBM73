using EstimadorBM.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace EstimadorBM.Services
{
	public class DBPrecioService
	{
		public DBPrecioService(IWebHostEnvironment hostEnvironment, EstimatorBMContext context)
		{
			this.hostEnvironment = hostEnvironment;
			this.context = context;
		}

		public EstimatorBMContext context { get; set; }
		public IWebHostEnvironment hostEnvironment { get; set; }

		public IEnumerable<Precio> GetPrecios(int ProveedorId)
		{
			var res = context.precios.FromSqlRaw($"EXEC [dbo].[Get_Precios] @id= {ProveedorId}").ToArray();
			return res;
		}

		public void SetPrecios(List<Precio> precios)
		{
			Dictionary<string, string> paramDic = new();
			foreach (var p in precios)
			{
				var @params = p.ToParam();
				@params["@Costo"] = @params["@Costo"].Replace(',', '.'); 
				if (paramDic.IsNullOrEmpty()) 
				{
					paramDic = @params;
				}
				else
					foreach (var param in @params)
					{
						paramDic[param.Key] += "," + param.Value;
					}

			}

			string parameters = string.Join(", ",paramDic.Select(pair => string.Format($"{pair.Key}='{pair.Value}'")).ToArray());

			var res = context.Database.SqlQueryRaw<int>($"exec dbo.Set_Precios {parameters}").ToArray();

			//@IngredienteName='Fernet,Campari,Jugo de Naranja,Vodka,Gin,Tonica,Vermouth Dry,Vermouth Rosso', @ProveedorId='1,1,1,1,1,1,1,1', @Marca='Proximamente,Proximamente,Proximamente,Proximamente,Proximamente,Proximamente,Proximamente,Proximamente', @Presentacion='750,750,1000,700,700,2250,1000,1000', @Costo='3500,1000.00,1925.00,0.00,768.00,0.00,2240.00,0.00', @IsNew='False,False,False,False,False,False,False,False'
		}
	}
}
