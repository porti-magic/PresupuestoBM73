﻿using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Models
{
	public class EstimatorBMContext : DbContext
	{
		public EstimatorBMContext(DbContextOptions options) : base(options) { }

		public DbSet<Carta> Cartas { get; set; }
		public DbSet<Trago> Tragos { get; set; }
		public DbSet<Estimado> Estimado { get; set; }
		public DbSet<Presupuesto> Presupuestos { get; set; }
		public DbSet<PresupuestoGeneralInfo> PresupuestoGeneralInfos { get; set; }
		public DbSet<FiltersData> FiltersData { get; set; }
		public DbSet<Ingrediente> Ingredientes { get; set; }
		public DbSet<Precio> precios { get; set; }
		public DbSet<Proveedor> Proveedores { get; set; }
		public DbSet<Receta> Recetas { get; set; }
		public DbSet<OtrosCostos> OtrosCostos { get;set; }
	}
}
