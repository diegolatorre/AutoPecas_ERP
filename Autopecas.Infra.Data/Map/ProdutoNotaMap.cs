using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class ProdutoNotaMap : IEntityTypeConfiguration<ProdutoNota>
    {
        public void Configure(EntityTypeBuilder<ProdutoNota> builder)
        {
            builder
                .ToTable("PRODUTONOTA")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDPRODUTONOTA")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdNota)
                .HasColumnName("IDNOTA")
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
                .HasOne(p => p.Nota)
                .WithMany(n => n.Produtos)
                .HasForeignKey(p => p.IdNota);

            builder
                .HasOne(p => p.Produto)
                .WithMany(p => p.Notas)
                .HasForeignKey(p => p.IdProduto);
        }
    }
}
