﻿using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class ProdutoService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public ProdutoService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<Produto> Obter(int idPeca)
        {
            return await _AutoPecasDbContext
                .Produtos
                .Where(p => p.Id == idPeca)
                .FirstOrDefaultAsync();
        }

        public async Task<IList<Produto>> Lista()
        {
            return await _AutoPecasDbContext
                .Produtos
                .ToListAsync();
        }
    }
}