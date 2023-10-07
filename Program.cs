using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using EstimadorBM.Services;
using EstimadorBM.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddRazorPages();
builder.Services.AddTransient<DBEstimationService>();
builder.Services.AddTransient<DBCartaService>();
builder.Services.AddTransient<DBTragosService>();
builder.Services.AddTransient<DBPresupestoService>();
builder.Services.AddTransient<DBProveedorService>();
builder.Services.AddControllers();
builder.Services.AddDbContext<EstimatorBMContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("EstimadorBM_DB")));
var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
	app.UseExceptionHandler("/Error");
}
app.UseStaticFiles();

app.UseRouting();

app.UseAuthorization();

app.MapRazorPages();

app.MapControllers();

app.Run();
