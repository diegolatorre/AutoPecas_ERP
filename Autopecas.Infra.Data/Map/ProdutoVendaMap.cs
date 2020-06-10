using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class ProdutoVendaMap : IEntityTypeConfiguration<ProdutoVenda>
    {
        public void Configure(EntityTypeBuilder<ProdutoVenda> builder)
        {
            builder
                .ToTable("PRODUTOVENDA")
                .HasKey(p => p.IdProdutoVenda);

            builder
                .Property(p => p.IdProdutoVenda)
                .HasColumnName("IDPRODUTOVENDA")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdVenda)
                .HasColumnName("IDVENDA")
                .IsRequired();

            builder
                .Property(p => p.IdProduto)
                .HasColumnName("IDPRODUTO")
                .IsRequired();

            builder
                .Property(p => p.Quantidade)
                .HasColumnName("QUANTIDADE")
                .IsRequired();

            builder
                .Property(p => p.Desconto)
                .HasColumnName("DESCONTO")
                .HasColumnType("FLOAT")
                .IsRequired();

            builder
                .Property(p => p.ValorFinal)
                .HasColumnName("VALORFINAL")
                .HasColumnType("FLOAT")
                .IsRequired();

            builder
                .HasOne(p => p.Venda)
                .WithMany(p => p.Produtos)
                .HasForeignKey(p => p.IdVenda);

            builder
                .HasOne(p => p.Produto)
                .WithMany()
                .HasForeignKey(p => p.IdProduto);
        }
    }
}
