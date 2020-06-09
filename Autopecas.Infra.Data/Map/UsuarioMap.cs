using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Text;

namespace Autopecas.Infra.Data.Map
{
    internal class UsuarioMap : IEntityTypeConfiguration<Usuario>
    {
        public void Configure(EntityTypeBuilder<Usuario> builder)
        {
            builder
                .ToTable("USUARIO")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("ID")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.Nome)
                .HasColumnName("NOME")
                .IsRequired();

            builder
                .Property(p => p.NomeUsuario)
                .HasColumnName("USUARIO")
                .IsRequired();

            builder
                .Property(p => p.Senha)
                .HasColumnName("SENHA")
                .IsRequired();

            builder
                .Property(p => p.Ativo)
                .HasColumnName("ATIVO")
                .IsRequired();

            builder
                .Property(p => p.Permissao)
                .HasColumnName("PERMISSAO")
                .IsRequired();
        }
    }
}
