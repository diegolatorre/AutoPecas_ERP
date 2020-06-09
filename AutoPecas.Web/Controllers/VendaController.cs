using Autopecas.Infra.Data;
using AutoPecas.Core;
using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using AutoPecas.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace AutoPecas.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VendaController : Controller
    {
        private readonly VendaService _VendaService;
        private readonly NotaService _NotaService;
        private readonly AutoPecasDbContext _AutoPecasDbContext;


        public VendaController(VendaService vendaService, NotaService notaService, AutoPecasDbContext autoPecasDbContext)
        {
            _VendaService = vendaService;
            _NotaService = notaService;
            _AutoPecasDbContext = autoPecasDbContext;
        }

        [HttpPost("lista")]
        public async Task<ActionResult<PaginacaoResultado<Venda>>> Lista(FiltroSpec filtro)
        {
            try
            {
                return Ok(await _VendaService.Lista(filtro));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("{idVenda}")]
        public async Task<ActionResult<Venda>> Obter(int idVenda)
        {
            try
            {
                return Ok(await _VendaService.Obter(idVenda));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<IActionResult> Venda(Venda venda)
        {
            try
            {
                using (var tran = _AutoPecasDbContext.Database.BeginTransaction())
                {
                    await _VendaService.Venda(venda);

                    if (venda.Status == StatusVenda.Finalizada)
                    {
                        foreach (var produto in venda.Produtos)
                            if (!_NotaService.ValidaDisponibilidadeProduto(produto.IdProduto, produto.Quantidade))
                            {
                                tran.Rollback();
                                throw new Exception($"Produto: {produto.IdProduto} indísponivel.");
                            }

                        await _NotaService.Venda(venda);
                    }

                    tran.Commit();
                }

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public async Task<IActionResult> UpdateVenda(Venda venda)
        {
            try
            {
                using (var tran = _AutoPecasDbContext.Database.BeginTransaction())
                {
                    await _VendaService.UpdateVenda(venda);

                    if (venda.Status == StatusVenda.Finalizada)
                    {
                        foreach (var produto in venda.Produtos)
                            if (!_NotaService.ValidaDisponibilidadeProduto(produto.IdProduto, produto.Quantidade))
                            {
                                tran.Rollback();
                                throw new Exception($"Produto: {produto.IdProduto} indísponivel.");
                            }

                        await _NotaService.Venda(venda);
                    }

                    tran.Commit();
                }

                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
