using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class TelefoneService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public TelefoneService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<IList<Telefone>> Lista()
        {
            return await _AutoPecasDbContext
                .Telefones
                .ToListAsync();
        }

        public async Task<Telefone> Obter(int idTelefone)
        {
            return await _AutoPecasDbContext
                .Telefones
                .Where(p => p.Id == idTelefone)
                .FirstOrDefaultAsync();
        }

        public async Task<int> Incluir(Telefone telefone)
        {
            _AutoPecasDbContext.Add(telefone);

            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
