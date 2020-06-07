using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using AutoPecas.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotaController : Controller
    {
        private readonly NotaService _service;

        public NotaController(NotaService service)
        {
            _service = service;
        }

        [HttpPost("entrada/lista")]
        public async Task<ActionResult<PaginacaoResultado<Nota>>> Lista(FiltroSpec filtro)
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

        [HttpGet("{idNota}")]
        public async Task<ActionResult<Nota>> Obter(int idNota)
        {
            try
            {
                return Ok(await _service.Obter(idNota));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost("entrada")]
        public async Task<ActionResult<int>> Incluir(Nota Nota)
        {
            try
            {
                return Ok(await _service.Incluir(Nota));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public async Task<IActionResult> Editar(Nota Nota)
        {
            try
            {
                return Ok(await _service.Editar(Nota));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("busca/{texto}")]
        public async Task<ActionResult<List<Nota>>> Busca(string texto)
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
