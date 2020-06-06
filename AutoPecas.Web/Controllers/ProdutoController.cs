using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using AutoPecas.Service;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Formatters;
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

        [HttpPost("lista")]
        public async Task<ActionResult<PaginacaoResultado<Produto>>> Lista(FiltroSpec filtro)
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

        [HttpGet("{idProduto}")]
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

        [HttpPost]
        public async Task<ActionResult<int>> Incluir(Produto produto)
        {
            try
            {
                return Ok(await _service.Incluir(produto));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("busca/{texto}")]
        public async Task<ActionResult<List<Produto>>> Busca(string texto)
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

