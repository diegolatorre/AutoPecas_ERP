using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class ProdutoMap : IEntityTypeConfiguration<Produto>
    {
        public void Configure(EntityTypeBuilder<Produto> builder)
        {
            builder
                .ToTable("PECA")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("ID")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.Descricao)
                .HasColumnName("DESCRICAO")
                .IsRequired();

            builder
                .Property(p => p.CodigoBarras)
                .HasColumnName("CODIGOBARRAS")
                .IsRequired();

            builder
                .Property(p => p.IdCategoria)
                .HasColumnName("IDCATEGORIA")
                .IsRequired();
            
            builder
                .Property(p => p.IdMarca)
                .HasColumnName("IDMARCA")
                .IsRequired();

            builder
                .Property(p => p.ValorCusto)
                .HasColumnName("VALORCUSTO")
                .IsRequired();
            
            builder
                .Property(p => p.ValorVenda)
                .HasColumnName("VALORVENDA")
                .IsRequired();

            builder
                .Property(p => p.Lucro)
                .HasColumnName("LUCRO")
                .IsRequired();

            builder
                .Property(p => p.EstoqueMinimo)
                .HasColumnName("ESTOQUEMINIMO")
                .IsRequired();

            builder
                .Property(p => p.EstoqueMaximo)
                .HasColumnName("ESTOQUEMAXIMO")
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
