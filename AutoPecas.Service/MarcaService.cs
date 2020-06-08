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
    public class MarcaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        private void AplicarFiltro(FiltroSpec filtro, out IQueryable<Marca> query)
        {
            query = _AutoPecasDbContext.Marcas
                        .AsExpandableEFCore();

            var predicate = PredicateBuilder.New<Marca>(true);

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

        public MarcaService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<PaginacaoResultado<Marca>> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Marca>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = await query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync();

            return resultado;
        }

        public async Task<Marca> Obter(int idMarca)
        {
            return await _AutoPecasDbContext
                .Marcas
                .Where(p => p.Id == idMarca)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Incluir(Marca marca)
        {
            _AutoPecasDbContext.Add(marca);

            return await _AutoPecasDbContext.SaveChangesAsync();
        }

        public async Task<IList<Marca>> Busca(string texto)
        {
            return await _AutoPecasDbContext
                .Marcas
                .Where(p => p.Nome.Contains(texto))
                .Take(5)
                .ToListAsync();
        }
        public async Task<int> Editar(Marca marca)
        {
            _AutoPecasDbContext.Update(marca);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
