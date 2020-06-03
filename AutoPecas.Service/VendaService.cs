using Autopecas.Infra.Data;
using AutoPecas.Core.Model;
using System.Threading.Tasks;

namespace AutoPecas.Service
{
    public class VendaService
    {
        private readonly AutoPecasDbContext _AutoPecasDbContext;

        public VendaService(AutoPecasDbContext autoPecasDbContext) => _AutoPecasDbContext = autoPecasDbContext;

        public async Task<int> Venda(Venda venda)
        {
            _AutoPecasDbContext.Add(venda);
            return await _AutoPecasDbContext.SaveChangesAsync();
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
