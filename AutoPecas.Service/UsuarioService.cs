using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using AutoPecas.Core.Spec;
using LinqKit;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class UsuarioService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        private void AplicarFiltro(FiltroSpec filtro, out IQueryable<Usuario> query)
        {
            query = _AutoPecasDbContext.Usuarios
                        .AsExpandableEFCore();

            var predicate = PredicateBuilder.New<Usuario>(true);

            if (filtro.Filtros.TryGetValue("nome", out var nome))
            {
                predicate.And(p => p.Nome.Contains((string)nome));
            }

            if (filtro.Filtros.TryGetValue("usuario", out var usuario))
            {
                predicate.Or(p => p.NomeUsuario.Contains((string)usuario));
            }

            query = query.Where(predicate);
        }

        public async Task<Usuario> Login(Usuario usuario)
        {
            return await _AutoPecasDbContext
                .Usuarios
                .Where(p => p.NomeUsuario == usuario.NomeUsuario && p.Senha == usuario.Senha && p.Ativo == true)
                .FirstOrDefaultAsync();
        }

        public UsuarioService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<PaginacaoResultado<Usuario>> Lista(FiltroSpec filtro)
        {
            AplicarFiltro(filtro, out var query);

            var resultado = new PaginacaoResultado<Usuario>(query, filtro.Pagina, filtro.Tamanho, filtro.Total);

            resultado.Lista = await query
                .Skip(filtro.Tamanho * (filtro.Pagina - 1))
                .Take(filtro.Tamanho)
                .ToListAsync();

            return resultado;
        }

        public async Task<Usuario> Obter(int idUsuario)
        {
            return await _AutoPecasDbContext
                .Usuarios
                .Where(p => p.Id == idUsuario)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Incluir(Usuario usuario)
        {
            _AutoPecasDbContext.Add(usuario);

            return await _AutoPecasDbContext.SaveChangesAsync();
        }

        public async Task<int> Editar(Usuario usuario)
        {
            _AutoPecasDbContext.Update(usuario);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }

        public async Task<IList<Usuario>> Busca(string texto)
        {
            return await _AutoPecasDbContext
                .Usuarios
                .Where(p => p.Nome.Contains(texto))
                .Take(5)
                .ToListAsync();
        }
    }
}

