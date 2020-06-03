using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Text;

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
                .Property(p => p.IdVenda)
                .HasColumnName("IDVENDA")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdProduto)
                .HasColumnName("IDPRODUTO")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdProdutoVenda)
                .HasColumnName("IDPRODUTOVENDA")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.Quantidade)
                .HasColumnName("QUANTIDADE")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.Desconto)
                .HasColumnName("DESCONTO")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.ValorFinal)
                .HasColumnName("VALORFINAL")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .HasOne(p => p.Venda)
                .WithMany(p => p.Produtos)
                .HasForeignKey(p => p.IdVenda);
        }
    }
}
