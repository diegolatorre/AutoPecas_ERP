using AutoPecas.Core.Model;
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
    public class TelefoneController : Controller
    {
        private readonly TelefoneService _service;

        public TelefoneController(TelefoneService service)
        {
            _service = service;
        }

        [HttpGet("lista")]
        public async Task<ActionResult<IList<Telefone>>> Lista()
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

        [HttpGet("{idTelefone}")]
        public async Task<ActionResult<Telefone>> Obter(int idTelefone)
        {
            try
            {
                return Ok(await _service.Obter(idTelefone));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Incluir(Telefone telefone)
        {
            try
            {
                return Ok(await _service.Incluir(telefone));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

    }
}
