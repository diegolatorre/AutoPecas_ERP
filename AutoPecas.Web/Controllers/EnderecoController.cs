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
    public class EnderecoController : Controller
    {
        private readonly EnderecoService _service;

        public EnderecoController(EnderecoService service)
        {
            _service = service;
        }

        [HttpGet("lista")]
        public async Task<ActionResult<IList<Endereco>>> Lista()
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

        [HttpGet("{idContato}")]
        public async Task<ActionResult<Endereco>> Obter(int idEndereco)
        {
            try
            {
                return Ok(await _service.Obter(idEndereco));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Incluir(Endereco endereco)
        {
            try
            {
                return Ok(await _service.Incluir(endereco));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
