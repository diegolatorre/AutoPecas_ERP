using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class MarcaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public MarcaService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<Marca> Obter(int idMarca)
        {
            return await _AutoPecasDbContext
                .Marcas
                .Where(p => p.Id == idMarca)
                .FirstOrDefaultAsync();
        }

        public async Task<List<Marca>> Lista()
        {
            return await _AutoPecasDbContext
                .Marcas
                .ToListAsync();
        }
    }
}
