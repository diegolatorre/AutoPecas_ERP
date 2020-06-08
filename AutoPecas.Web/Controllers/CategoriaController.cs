using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using AutoPecas.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoPecas.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriaController : Controller
    {
        private readonly CategoriaService _service;

        public CategoriaController(CategoriaService service)
        {
            _service = service;
        }

        [HttpPost("lista")]
        public async Task<ActionResult<IList<Categoria>>> Lista(FiltroSpec filtro)
        {
            try
            {
                return Ok(await _service.Lista(filtro));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("{idCategoria}")]
        public async Task<ActionResult<Categoria>> Obter(int idCategoria)
        {
            try
            {
                return Ok(await _service.Obter(idCategoria));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Incluir(Categoria categoria)
        {
            try
            {
                return Ok(await _service.Incluir(categoria));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("busca/{texto}")]
        public async Task<ActionResult<List<Categoria>>> Busca(string texto)
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

        [HttpPut]
        public async Task<IActionResult> Editar(Categoria categoria)
        {
            try
            {
                return Ok(await _service.Editar(categoria));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
