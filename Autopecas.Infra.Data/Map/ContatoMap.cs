using AutoPecas.Core.Model;
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
                 .HasColumnName("APELIDO");

            builder
                .Property(p => p.Cpf)
                .HasColumnName("CPF");

            builder
                .Property(p => p.Rg)
                .HasColumnName("RG");

            builder
                .Property(p => p.Tipo)
                .HasColumnName("TIPO")
                .IsRequired();

            builder
                .Property(p => p.Profissao)
                .HasColumnName("PROFISSAO");

            builder
                .Property(p => p.DataNascimento)
                .HasColumnName("DATANASCIMENTO");

            builder
                .Property(p => p.Sexo)
                .HasColumnName("SEXO");

            builder
                .Property(p => p.Observacao)
                .HasColumnName("OBSERVACAO");

            builder
                .Property(p => p.Ativo)
                .HasColumnName("ATIVO")
                .IsRequired();

            builder
                .HasMany(p => p.Telefones)
                .WithOne(p => p.Contato)
                .HasForeignKey(p => p.IdContato);

            builder
                .HasMany(p => p.Enderecos)
                .WithOne(p => p.Contato)
                .HasForeignKey(p => p.IdContato);

            builder
                .HasMany(p => p.NotasOrigem)
                .WithOne(p => p.ContatoOrigem)
                .HasForeignKey(p => p.IdContatoOrigem);

            builder
                .HasMany(p => p.NotasDestino)
                .WithOne(p => p.ContatoDestino)
                .HasForeignKey(p => p.IdContatoDestino);
        }
    }
}
