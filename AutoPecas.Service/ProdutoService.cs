using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using LinqKit;
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

            if (filtro.Filtros.TryGetValue("marca", out var marca))
            {
                predicate.And(p => p.IdMarca == (int)(long)marca);
            }

            if (filtro.Filtros.TryGetValue("categoria", out var categoria))
            {
                predicate.And(p => p.IdCategoria == (int)(long)categoria);
            }

            query = query.Where(predicate);
        }

        public async Task<PaginacaoResultado<Produto>> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Produto>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = await query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync();

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

        public async Task<int> Editar(Produto produto)
        {
            _AutoPecasDbContext.Update(produto);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }

        public async Task<IList<Produto>> Busca(string texto)
        {
            return await _AutoPecasDbContext
                .Produtos
                .Include(p => p.Marca)
                .Include(p => p.Categoria)
                .Where(p => p.CodigoBarras.Contains(texto) || p.Descricao.Contains(texto) | p.Id.ToString().Contains(texto))
                .Take(5)
                .ToListAsync();
        }

    }
}
