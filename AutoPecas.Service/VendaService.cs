using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class VendaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public VendaService(AutoPecasDbContext autoPecasDbContext) => _AutoPecasDbContext = autoPecasDbContext;

        public async Task<int> Venda(Venda venda)
        {
            venda.DataCriacao = DateTime.Now;
            venda.DataFinalizacao = DateTime.Now;
            venda.Ativo = true;

            venda.Contato = null;

            venda.Produtos.ToList().ForEach(p =>
            {
                p.Produto = null;
            });

            _AutoPecasDbContext.Add(venda);
            var t = await _AutoPecasDbContext.SaveChangesAsync();
            return t;
        }

        public async Task<int> UpdateVenda(Venda venda, int id)
        {
            if (venda.Id != id)
                return 0;

            _AutoPecasDbContext.Update(venda);
            return await _AutoPecasDbContext.SaveChangesAsync();
        }
    }
}
