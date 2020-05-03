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
    public class CategoriaController : Controller
    {
        private readonly CategoriaService _service;

        public CategoriaController(CategoriaService service)
        {
            _service = service;
        }

        [HttpGet("lista")]
        public async Task<ActionResult<IList<Categoria>>> Lista()
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

        [HttpGet("{idPeca}")]
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
    }
}
