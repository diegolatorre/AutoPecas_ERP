using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using AutoPecas.Service;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AutoPecas.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly UsuarioService _service;

        public UsuarioController(UsuarioService service)
        {
            _service = service;
        }

        [HttpPost("lista")]
        public async Task<ActionResult<IList<Usuario>>> Lista(FiltroSpec filtro)
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

        [HttpPost("login")]
        public async Task<ActionResult<Usuario>> Login(Usuario usuario)
        {
            try
            {
                return Ok(await _service.Login(usuario));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("{idUsuario}")]
        public async Task<ActionResult<Usuario>> Obter(int idUsuario)
        {
            try
            {
                return Ok(await _service.Obter(idUsuario));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpPost]
        public async Task<ActionResult<int>> Incluir(Usuario usuario)
        {
            try
            {
                return Ok(await _service.Incluir(usuario));
            }
            catch (Exception e)
            {
                throw e;
            }
        }

        [HttpGet("busca/{texto}")]
        public async Task<ActionResult<List<Usuario>>> Busca(string texto)
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

        [HttpPut]
        public async Task<IActionResult> Editar(Usuario usuario)
        {
            try
            {
                return Ok(await _service.Editar(usuario));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
