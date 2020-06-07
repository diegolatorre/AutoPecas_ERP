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
        private readonly VendaService _service;

        public VendaController(VendaService service) => _service = service;


        [HttpPost("lista")]
        public async Task<ActionResult<PaginacaoResultado<Venda>>> Lista(FiltroSpec filtro)
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

        [HttpPost]
        public async Task<IActionResult> Venda(Venda venda)
        {
            try
            {
                return Ok(await _service.Venda(venda));
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
                return Ok(await _service.UpdateVenda(venda));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
