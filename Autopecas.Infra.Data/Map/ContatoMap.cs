﻿using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class ContatoMap : IEntityTypeConfiguration<Contato>
    {
        public void Configure(EntityTypeBuilder<Contato> builder)
        {
            builder
                .ToTable("CONTATO")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDCONTATO")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.Nome)
                .HasColumnName("NOME")
                .IsRequired();

            builder
                 .Property(p => p.Apelido)
                 .HasColumnName("APELIDO")
                 .IsRequired();

            builder
                .Property(p => p.Cpf)
                .HasColumnName("CPF")
                .IsRequired();

            builder
                .Property(p => p.Rg)
                .HasColumnName("RG")
                .IsRequired();

            builder
                .Property(p => p.Tipo)
                .HasColumnName("TIPO")
                .IsRequired();

            builder
                .Property(p => p.Profissao)
                .HasColumnName("PROFISSAO")
                .IsRequired();

            builder
                .Property(p => p.DataNascimento)
                .HasColumnName("DATANASCIMENTO")
                .IsRequired();

            builder
                .Property(p => p.Sexo)
                .HasColumnName("SEXO")
                .IsRequired();

            builder
                .Property(p => p.Observacao)
                .HasColumnName("OBSERVACAO")
                .IsRequired();

            builder
                .Property(p => p.Ativo)
                .HasColumnName("ATIVO")
                .IsRequired();
        }
    }
}