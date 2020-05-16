using AutoPecas.Core.Model;
using AutoPecas.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoPecas.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarcaController : Controller
    {
        private readonly MarcaService _service;

        public MarcaController(MarcaService service)
        {
            _service = service;
        }

        [HttpGet("lista")]
        public async Task<ActionResult<List<Marca>>> Lista()
        {
            try
            {
                return Ok(await _service.Lista());
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("{idMarca}")]
        public async Task<ActionResult<Marca>> Obter(int idMarca)
        {
            try
            {
                return Ok(await _service.Obter(idMarca));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Incluir(Marca marca)
        {
            try
            {
                return Ok(await _service.Incluir(marca));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("busca/{texto}")]
        public async Task<ActionResult<List<Marca>>> Busca(string texto)
        {
            try
            {
                return Ok(await _service.Busca(texto));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
