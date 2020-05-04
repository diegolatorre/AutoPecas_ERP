using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
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

        public async Task<Contato> Obter(int idContato)
        {
            return await _AutoPecasDbContext
                .Contatos
                .Include(p => p.Enderecos)
                .Include(p => p.Telefones)
                .Where(p => p.Id == idContato)
                .FirstOrDefaultAsync();
        }

        public async Task<IList<Contato>> Lista()
        {
            return await _AutoPecasDbContext
                .Contatos
                .ToListAsync();
        }

        public async Task<int> Incluir(Contato contato)
        {
            _AutoPecasDbContext.Add(contato);

            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
