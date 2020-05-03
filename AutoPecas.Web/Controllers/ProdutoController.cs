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
    public class ProdutoController : Controller
    {
        private readonly ProdutoService _service;

        public ProdutoController(ProdutoService service)
        {
            _service = service;
        }

        [HttpGet("lista")]
        public async Task<ActionResult<IList<Produto>>> Lista()
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
        public async Task<ActionResult<Produto>> Obter(int idPeca)
        {
            try
            {
                return Ok(await _service.Obter(idPeca));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}

