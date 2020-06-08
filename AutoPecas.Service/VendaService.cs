using Autopecas.Infra.Data;
using AutoPecas.Core;
using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class VendaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public VendaService(AutoPecasDbContext autoPecasDbContext) => _AutoPecasDbContext = autoPecasDbContext;

        private void AplicarFiltro(FiltroSpec filtro, out IQueryable<Venda> query)
        {
            query = _AutoPecasDbContext.Vendas
                .Include(v => v.Contato)
                .Include(v => v.Produtos)
                .ThenInclude(p => p.Produto)
                .AsExpandableEFCore();

            var predicate = PredicateBuilder.New<Venda>(true);

            query = query.Where(predicate);
        }

        public async Task<PaginacaoResultado<Venda>> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Venda>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = await query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync();

            return resultado;
        }

        public async Task<Venda> Obter(int idVenda)
        {
            return await _AutoPecasDbContext
                .Vendas
                .Include(v => v.Contato)
                .Include(v => v.Produtos)
                .ThenInclude(p => p.Produto)
                .Where(p => p.Id == idVenda)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Venda(Venda venda)
        {
            venda.DataCriacao = DateTime.Now;

            venda.DataFinalizacao = DateTime.Now;

            venda.Valor = venda.Produtos.Sum(p => p.ValorFinal);

            venda.Contato = null;

            venda.Produtos.ToList().ForEach(p =>
            {
                p.Produto = null;
            });

            _AutoPecasDbContext.Add(venda);
            var t = await _AutoPecasDbContext.SaveChangesAsync();
            return t;
        }

        public async Task<int> UpdateVenda(Venda venda)
        {
            venda.DataFinalizacao = DateTime.Now;

            venda.Contato = null;

            venda.Valor = venda.Produtos.Sum(p => p.ValorFinal);

            venda.Produtos.ToList().ForEach(p =>
            {
                p.Produto = null;
            });

            _AutoPecasDbContext.Update(venda);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
