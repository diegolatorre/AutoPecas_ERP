using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class PecaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public PecaService (AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<Peca> Obter(int idPeca)
        {
            return await _AutoPecasDbContext
                .Pecas
                .Where(p => p.Id == idPeca)
                .FirstOrDefaultAsync();
        }

        public async Task<IList<Peca>> Lista()
        {
            return await _AutoPecasDbContext
                .Pecas
                .ToListAsync();
        }
    }
}
