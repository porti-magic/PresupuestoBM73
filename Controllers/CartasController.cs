﻿using EstimadorBM.Models;
using EstimadorBM.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace EstimadorBM.Controllers
{
	[Route("[controller]")]
	[ApiController]
	public class CartasController : ControllerBase
	{
		public CartasController(DBCartaService CartaService, EstimatorBMContext context) 
		{
			this.CartaService = CartaService;
			_cotext = context;
		}

		public DBCartaService CartaService { get;}

        public EstimatorBMContext _cotext { get; }

		//[HttpGet]
		//public IEnumerable<Carta> Get() => CartaService.GetCartas();

		[HttpGet()]
		public IEnumerable<Carta> Get() => CartaService.GetCartas();
	}
}
