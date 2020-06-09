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
                .ToTable("PRODUTO")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDPRODUTO")
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
                .HasColumnType("DECIMAL(18,2)")
                .IsRequired();
            
            builder
                .Property(p => p.ValorVenda)
                .HasColumnName("VALORVENDA")
                .HasColumnType("DECIMAL(18,5)")
                .IsRequired();

            builder
                .Property(p => p.Lucro)
                .HasColumnName("LUCRO")
                .HasColumnType("DECIMAL(3,2)");

            builder
                .Property(p => p.EstoqueMinimo)
                .HasColumnName("ESTOQUEMINIMO");

            builder
                .Property(p => p.EstoqueMaximo)
                .HasColumnName("ESTOQUEMAXIMO");

            builder
                .Property(p => p.Observacao)
                .HasColumnName("OBSERVACAO");

            builder
                .Property(p => p.Ativo)
                .HasColumnName("ATIVO")
                .IsRequired();

            builder
                .HasOne(p => p.Marca)
                .WithMany()
                .HasForeignKey(p => p.IdMarca);

            builder
              .HasOne(p => p.Categoria)
              .WithMany()
              .HasForeignKey(p => p.IdCategoria);

            builder
                .Ignore(p => p.Quantidade);
        }
    }
}
