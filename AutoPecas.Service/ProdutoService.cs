﻿using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
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

        private void AplicarFiltro(FiltroSpec filtro, out IQueryable<Produto> query)
        {
            query = _AutoPecasDbContext.Produtos
                        .Include(p => p.Marca)
                        .Include(p => p.Categoria)
                        .AsExpandableEFCore();

            var predicate = PredicateBuilder.New<Produto>(true);

            if (filtro.Filtros.TryGetValue("descricao", out var descricao))
            {
                predicate.And(p => p.Descricao.Contains((string)descricao));
            }

            query = query.Where(predicate);
        }

        public PaginacaoResultado<Produto> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Produto>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync().Result;

            return resultado;
        }

        public async Task<Produto> Obter(int idPeca)
        {
            return await _AutoPecasDbContext
                .Produtos
                .Where(p => p.Id == idPeca)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Incluir(Produto produto)
        {
            _AutoPecasDbContext.Add(produto);

            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
