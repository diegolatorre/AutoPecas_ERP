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
    public class ContatoService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public ContatoService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        private void AplicarFiltro(FiltroSpec filtro, out IQueryable<Contato> query)
        {
            query = _AutoPecasDbContext.Contatos
                        .Include(p => p.Telefones)
                        .Include(p => p.Enderecos)
                        .AsExpandableEFCore();

            var predicate = PredicateBuilder.New<Contato>(true);

            if (filtro.Filtros.TryGetValue("nome", out var nome))
            {
                predicate.And(p => p.Nome.Contains((string)nome));
            }

            query = query.Where(predicate);
        }

        public async Task<PaginacaoResultado<Contato>> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Contato>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = await query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync();

            return resultado;
        }

        public async Task<Contato> Obter(int idContato)
        {
            return await _AutoPecasDbContext
                .Contatos
                .Where(p => p.Id == idContato)
                .Include(p => p.Telefones)
                .Include(p => p.Enderecos)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Incluir(Contato contato)
        {
            _AutoPecasDbContext.Add(contato);
            await _AutoPecasDbContext.SaveChangesAsync();

            return contato.Id;
        }

        public async Task<int> Editar(Contato contato)
        {
            _AutoPecasDbContext.Update(contato);
            await _AutoPecasDbContext.SaveChangesAsync();

            return contato.Id;
        }

        public async Task<IList<Contato>> Busca(string texto)
        {
            return await _AutoPecasDbContext
                .Contatos
                .Where(p => p.Nome.Contains(texto))
                .Take(5)
                .ToListAsync();
        }
    }
}
