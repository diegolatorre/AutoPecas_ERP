using Microsoft.Extensions.DependencyInjection;

namespace AutoPecas.Service
{
    public static class ServiceCollectionExtension
    {
        public static IServiceCollection AddAppService(this IServiceCollection services)
        {
            return services;
        }
    }
}
