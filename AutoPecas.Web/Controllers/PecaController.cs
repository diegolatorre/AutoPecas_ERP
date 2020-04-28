using Autopecas.Infra.Data;
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
    public class PecaController : ControllerBase
    {
        private readonly PecaService _PecaService;
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public PecaController(PecaService pecaService,  AutoPecasDbContext autoPecasDbContext)
        {
            _PecaService = pecaService;
            _AutoPecasDbContext = autoPecasDbContext;
        }

        [HttpGet("lista")]
        public async Task<ActionResult<IList<Peca>>> Lista()
        {
            try
            {
                return Ok(await _PecaService.Lista());
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
                return Ok(await _PecaService.Obter(idPeca));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}
