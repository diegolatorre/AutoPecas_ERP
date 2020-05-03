using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class CategoriaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public CategoriaService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<Categoria> Obter(int idCategoria)
        {
            return await _AutoPecasDbContext
                .Categorias
                .Where(p => p.Id == idCategoria)
                .FirstOrDefaultAsync();
        }

        public async Task<IList<Categoria>> Lista()
        {
            return await _AutoPecasDbContext
                .Categorias
                .ToListAsync();
        }
    }
}
