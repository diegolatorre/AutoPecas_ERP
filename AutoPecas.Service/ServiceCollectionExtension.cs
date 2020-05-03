using Autopecas.Infra.Data;
using Microsoft.Extensions.DependencyInjection;

namespace AutoPecas.Service
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddAppService(this IServiceCollection services)
        {
            services
                .AddDbContext<AutoPecasDbContext>()
                .AddTransient<ProdutoService>();

            return services;
        }
    }
}
