using AutoPecas.Core.Model;
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

        [HttpPost]
        public async Task<IActionResult> Venda([FromBody] Venda venda)
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

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateVenda([FromBody] Venda venda, int id)
        {
            try
            {
                return Ok(await _service.UpdateVenda(venda, id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
