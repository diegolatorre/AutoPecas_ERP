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
    public class ContatoController : Controller
    {
        private readonly ContatoService _service;

        public ContatoController(ContatoService service)
        {
            _service = service;
        }

        [HttpPost("lista")]
        public async Task<ActionResult<IList<Contato>>> Lista(FiltroSpec filtro)
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

        [HttpGet("{idContato}")]
        public async Task<ActionResult<Contato>> Obter(int idContato)
        {
            try
            {
                return Ok(await _service.Obter(idContato));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Incluir(Contato contato)
        {
            try
            {
                return Ok(await _service.Incluir(contato));
            }
            catch(Exception e)
            {
                throw e;
            }
        }
    }
}
