﻿using AutoPecas.Core.Model;
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
    public class ProdutoController : Controller
    {
        private readonly ProdutoService _service;

        public ProdutoController(ProdutoService service)
        {
            _service = service;
        }

        [HttpPost("lista")]
        public ActionResult<PaginacaoResultado<Produto>> Lista(FiltroSpec filtro)
        {
            try
            {
                return Ok(_service.Lista(filtro));
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
                return Ok(await _service.Obter(idPeca));
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
                return Ok(await _service.Incluir(produto));
            }
            catch (Exception e)
            {
                throw e;
            }
        }
    }
}

