﻿using Autopecas.Infra.Data.Map;
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

        #endregion

        public AutoPecasDbContext(IConfiguration config, ILoggerFactory loggerFactory)
        {
            _Config = config;
            _LoggerFactory = loggerFactory;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder
                .ApplyConfiguration(new ProdutoMap());
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
