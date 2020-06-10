using Autopecas.Infra.Data;
using AutoPecas.Core;
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
    public class NotaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public NotaService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        private void AplicarFiltro(FiltroSpec filtro, out IQueryable<Nota> query)
        {
            query = _AutoPecasDbContext.Notas
                .Include(n => n.ContatoOrigem)
                .Include(n => n.ContatoDestino)
                .Include(n => n.Produtos)
                .ThenInclude(n => n.Produto)
                .AsExpandableEFCore();

            var predicate = PredicateBuilder.New<Nota>(true);

            query = query.Where(predicate);
        }

        public async Task<PaginacaoResultado<Nota>> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Nota>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = await query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync();

            return resultado;
        }

        public async Task<Nota> Obter(int idPeca)
        {
            return await _AutoPecasDbContext
                .Notas
                .Where(p => p.Id == idPeca)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Incluir(Nota nota)
        {
            //Id Interno do sistema
            nota.IdContatoDestino = 47;

            nota.Produtos = nota.Produtos.Select(p => new ProdutoNota()
            {
                IdProduto = p.IdProduto,
                Quantidade = p.Quantidade
            }).ToList();

            _AutoPecasDbContext.Add(nota);

            var result = await _AutoPecasDbContext.SaveChangesAsync();

            return result;
        }

        public async Task<int> Venda(Venda venda)
        {


            var nota = new Nota();

            nota.ChaveAcesso = new Random().Next(10000000).ToString() + new Random().Next(10000000).ToString();
            nota.Tipo = TipoNota.Saida;
            nota.IdContatoOrigem = 47;
            nota.IdContatoDestino = venda.IdContato;

            nota.Produtos = venda.Produtos.Select(p => new ProdutoNota()
            {
                IdProduto = p.IdProduto,
                Quantidade = p.Quantidade
            }).ToList();

            nota.Observacao = "Nota gerada a partir da venda:" + venda.Id.ToString();

            _AutoPecasDbContext.Add(nota);
            var t = await _AutoPecasDbContext.SaveChangesAsync();

            return t;
        }

        public async Task<int> Editar(Nota nota)
        {
            _AutoPecasDbContext.Update(nota);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }

        public async Task<IList<Nota>> Busca(string texto)
        {
            return await _AutoPecasDbContext
                .Notas
                .Where(p => p.Id.ToString().Contains(texto))
                .Take(5)
                .ToListAsync();
        }

        public bool ValidaDisponibilidadeProduto(int id, int quantidade)
        {
            var saidas = _AutoPecasDbContext.ProdutoNota.Where(p => p.IdProduto == id && p.Nota.Tipo == TipoNota.Saida).Sum(p => p.Quantidade);
            var entradas = _AutoPecasDbContext.ProdutoNota.Where(p => p.IdProduto == id && p.Nota.Tipo == TipoNota.Entrada).Sum(p => p.Quantidade);

            if (saidas + quantidade <= entradas)
                return true;

            return false;
        }

        public int VerificaEstoqueProduto(int id)
        {
            var saidas = _AutoPecasDbContext.ProdutoNota.Where(p => p.IdProduto == id && p.Nota.Tipo == TipoNota.Saida).Sum(p => p.Quantidade);
            var entradas = _AutoPecasDbContext.ProdutoNota.Where(p => p.IdProduto == id && p.Nota.Tipo == TipoNota.Entrada).Sum(p => p.Quantidade);

            if (saidas == entradas)
                return 0;
            else
                return entradas - saidas;
        }

    }
}
