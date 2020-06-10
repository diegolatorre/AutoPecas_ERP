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
    public class ProdutoController : Controller
    {
        private readonly ProdutoService _produtoService;
        private readonly NotaService _notaService;

        public ProdutoController(ProdutoService produtoService, NotaService notaService)
        {
            _produtoService = produtoService;
            _notaService = notaService;
        }

        [HttpPost("lista")]
        public async Task<ActionResult<PaginacaoResultado<Produto>>> Lista(FiltroSpec filtro)
        {
            try
            {
                var produtos = await _produtoService.Lista(filtro);

                if (produtos.Lista.Count() > 0)
                    foreach (var produto in produtos.Lista)
                        produtos.Lista.FirstOrDefault(p => p.Id == produto.Id).Quantidade = _notaService.VerificaEstoqueProduto(produto.Id);

                return Ok(produtos);
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
                var produto = await _produtoService.Obter(idPeca);
                produto.Quantidade = _notaService.VerificaEstoqueProduto(produto.Id);

                return Ok(produto);
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
                return Ok(await _produtoService.Incluir(produto));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPut]
        public async Task<IActionResult> Editar(Produto produto)
        {
            try
            {
                return Ok(await _produtoService.Editar(produto));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("busca/{texto}")]
        public async Task<ActionResult<List<Produto>>> Busca(string texto)
        {
            try
            {
                var produtos = await _produtoService.Busca(texto);

                if (produtos.Count() > 0)
                    foreach (var produto in produtos)
                        produtos.FirstOrDefault(p => p.Id == produto.Id).Quantidade = _notaService.VerificaEstoqueProduto(produto.Id);

                return Ok(produtos);
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("disponibilidade/{id}/{quantidade}")]
        public IActionResult Disponibilidade(int id, int quantidade)
        {
            try
            {
                return Ok(_notaService.ValidaDisponibilidadeProduto(id, quantidade));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}

