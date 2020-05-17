using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class EnderecoService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public EnderecoService(AutoPecasDbContext autoPecasDbContext)
        {
            _AutoPecasDbContext = autoPecasDbContext;
        }

        public async Task<Endereco> Obter(int idEndereco)
        {
            return await _AutoPecasDbContext
                .Enderecos
                .Where(p => p.Id == idEndereco)
                .FirstOrDefaultAsync();
        }

        public async Task<IList<Endereco>> Lista()
        {
            return await _AutoPecasDbContext
                .Enderecos
                .ToListAsync();
        }

        public async Task<int> Incluir(Endereco endereco)
        {
            _AutoPecasDbContext.Add(endereco);

            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
