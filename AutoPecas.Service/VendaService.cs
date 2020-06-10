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

            if (filtro.Filtros.TryGetValue("idContato", out var idContato))
            {
                predicate.And(p => p.IdContato == (int)(long)idContato);
            }

            if (filtro.Filtros.TryGetValue("statusAberto", out var statusAberto))
            {
                if (filtro.Filtros.TryGetValue("statusFinalizada", out var statusFinalizada))
                {
                    if ((bool)statusAberto && (bool)statusFinalizada)
                    {
                        predicate.And(p => p.Status == StatusVenda.Aberta || p.Status == StatusVenda.Finalizada);
                    }
                    else if ((bool)statusAberto)
                    {
                        predicate.And(p => p.Status == StatusVenda.Aberta);
                    }
                    else if ((bool)statusFinalizada)
                    {
                        predicate.And(p => p.Status == StatusVenda.Finalizada);
                    }
                }
            }

            if (filtro.Filtros.TryGetValue("valorInicial", out var valorInicial))
            {
                predicate.And(p => p.Valor >= (float)(long)valorInicial);
            }

            if (filtro.Filtros.TryGetValue("valorFinal", out var valorFinal))
            {
                predicate.And(p => p.Valor <= (float)(long)valorFinal);
            }

            if (filtro.Filtros.TryGetValue("dataAberturaInicial", out var dataAberturaInicial))
            {
                predicate.And(p => p.DataCriacao >= (DateTime)dataAberturaInicial);
            }

            if (filtro.Filtros.TryGetValue("dataAberturaFinal", out var dataAberturaFinal))
            {
                predicate.And(p => p.DataCriacao <= (DateTime)dataAberturaFinal);
            }

            if (filtro.Filtros.TryGetValue("dataFinalizacaoInicial", out var dataFinalizacaoInicial))
            {
                predicate.And(p => p.DataFinalizacao >= (DateTime)dataFinalizacaoInicial);
            }

            if (filtro.Filtros.TryGetValue("dataFinalizacaoFinal", out var dataFinalizacaoFinal))
            {
                predicate.And(p => p.DataFinalizacao <= (DateTime)dataFinalizacaoFinal);
            }

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

            venda.Produtos.ToList().ForEach(p =>
            {
                p.Produto = null;
            });

            _AutoPecasDbContext.Update(venda);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
