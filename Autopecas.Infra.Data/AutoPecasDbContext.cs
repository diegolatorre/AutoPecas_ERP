using Autopecas.Infra.Data.Map;
using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;

namespace Autopecas.Infra.Data
{
    public class AutoPecasDbContext : DbContext
    {
        private readonly IConfiguration _Config;
        private readonly ILoggerFactory _LoggerFactory;

        #region DbSet

        public DbSet<Produto> Produtos { get; set; }
        public DbSet<Marca> Marcas { get; set; }
        public DbSet<Categoria> Categorias { get; set; }
        public DbSet<Contato> Contatos { get; set; }
        public DbSet<Telefone> Telefones { get; set; }
        public DbSet<Endereco> Enderecos { get; set; }
        public DbSet<Venda> Vendas { get; set; }
        public DbSet<ProdutoVenda> ProdutosVenda { get; set; }
        public DbSet<Nota> Notas { get; set; }
        public DbSet<ProdutoNota> ProdutoNota { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }

        #endregion

        public AutoPecasDbContext(IConfiguration config, ILoggerFactory loggerFactory)
        {
            _Config = config;
            _LoggerFactory = loggerFactory;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .ApplyConfiguration(new ProdutoMap())
                .ApplyConfiguration(new MarcaMap())
                .ApplyConfiguration(new CategoriaMap())
                .ApplyConfiguration(new ContatoMap())
                .ApplyConfiguration(new EnderecoMap())
                .ApplyConfiguration(new TelefoneMap())
                .ApplyConfiguration(new VendaMap())
                .ApplyConfiguration(new ProdutoVendaMap())
                .ApplyConfiguration(new NotaMap())
                .ApplyConfiguration(new ProdutoNotaMap())
                .ApplyConfiguration(new UsuarioMap());

        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .UseSqlServer(_Config.GetConnectionString("AutoPecas"),
                opts => opts.CommandTimeout((int)TimeSpan.FromMinutes(10).TotalSeconds)
            )
            .UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking)
            .UseLoggerFactory(_LoggerFactory);
        }
    }
}
