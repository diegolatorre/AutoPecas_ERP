using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Autopecas.Infra.Data.Map
{
    internal class TelefoneMap : IEntityTypeConfiguration<Telefone>
    {
        public void Configure(EntityTypeBuilder<Telefone> builder)
        {
            builder
                .ToTable("TELEFONE")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDTELEFONE")
                .UseIdentityColumn();

            builder
                .Property(p => p.IdContato)
                .HasColumnName("IDCONTATO")
                .UseIdentityColumn();

            builder
                .Property(p => p.Tipo)
                .HasColumnName("TIPO")
                .UseIdentityColumn();

            builder
                .Property(p => p.Numero)
                .HasColumnName("NUMERO")
                .UseIdentityColumn();

            builder
                .HasOne(p => p.Contato)
                .WithMany()
                .HasForeignKey(p => p.IdContato);
        }
    }
}
