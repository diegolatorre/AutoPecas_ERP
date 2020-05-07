﻿using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Autopecas.Infra.Data.Map
{
    internal class EnderecoMap : IEntityTypeConfiguration<Endereco>
    {
        public void Configure(EntityTypeBuilder<Endereco> builder)
        {
            builder
                .ToTable("ENDERECO")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDENDERECO")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdContato)
                .HasColumnName("IDCONTATO")
                .IsRequired();

            builder
                .Property(p => p.Logradouro)
                .HasColumnName("LOGRADOURO")
                .IsRequired();

            builder
                .Property(p => p.Uf)
                .HasColumnName("UF")
                .IsRequired();

            builder
                .Property(p => p.Bairro)
                .HasColumnName("BAIRRO")
                .IsRequired();

            builder
                .Property(p => p.Complemento)
                .HasColumnName("COMPLEMENTO")
                .IsRequired();
        }
    }
}
