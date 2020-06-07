using Autopecas.Infra.Data;
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
    public class CategoriaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        private void AplicarFiltro(FiltroSpec filtro, out IQueryable<Categoria> query)
        {
            query = _AutoPecasDbContext.Categorias
                        .AsExpandableEFCore();

            var predicate = PredicateBuilder.New<Categoria>(true);

            if (filtro.Filtros.TryGetValue("nome", out var nome))
            {
                predicate.And(p => p.Nome.Contains((string)nome));
            }

            if (filtro.Filtros.TryGetValue("descricao", out var descricao))
            {
                predicate.Or(p => p.Descricao.Contains((string)descricao));
            }

            query = query.Where(predicate);
        }

        public CategoriaService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<PaginacaoResultado<Categoria>> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Categoria>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = await query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync();

            return resultado;
        }

        public async Task<Categoria> Obter(int idCategoria)
        {
            return await _AutoPecasDbContext
                .Categorias
                .Where(p => p.Id == idCategoria)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Incluir(Categoria categoria)
        {
            _AutoPecasDbContext.Add(categoria);

            return await _AutoPecasDbContext.SaveChangesAsync();
        }

        public async Task<int> Editar(Categoria categoria)
        {
            _AutoPecasDbContext.Update(categoria);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }

        public async Task<IList<Categoria>> Busca(string texto)
        {
            return await _AutoPecasDbContext
                .Categorias
                .Where(p => p.Nome.Contains(texto))
                .Take(5)
                .ToListAsync();
        }
    }
}
