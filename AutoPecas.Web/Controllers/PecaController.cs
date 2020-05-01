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
    public class PecaController : Controller
    {
        private readonly PecaService _service;

        public PecaController(PecaService service)
        {
            _service = service;
        }

        [HttpGet("lista")]
        public async Task<ActionResult<IList<Peca>>> Lista()
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
        public async Task<ActionResult<Peca>> Obter(int idPeca)
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

