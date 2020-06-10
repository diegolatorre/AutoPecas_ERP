using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class VendaMap : IEntityTypeConfiguration<Venda>
    {
        public void Configure(EntityTypeBuilder<Venda> builder)
        {
            builder
                .ToTable("VENDA")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDVENDA")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdContato)
                .HasColumnName("IDCONTATO")
                .IsRequired();

            builder
                .Property(p => p.Status)
                .HasColumnName("STATUS")
                .IsRequired();

            builder
                .Property(p => p.DataCriacao)
                .HasColumnName("DATACRIACAO")
                .IsRequired();

            builder
                .Property(p => p.DataFinalizacao)
                .HasColumnName("DATAFINALIZACAO")
                .IsRequired();

            builder
                .Property(p => p.Desconto)
                .HasColumnName("DESCONTO")
                .HasColumnType("FLOAT")
                .IsRequired();

            builder
                .Property(p => p.Valor)
                .HasColumnName("VALOR")
                .HasColumnType("FLOAT")
                .IsRequired();

            builder
                .HasOne(p => p.Contato)
                .WithMany()
                .HasForeignKey(p => p.IdContato);

            builder
                .HasMany(p => p.Produtos)
                .WithOne(p => p.Venda)
                .HasForeignKey(p => p.IdVenda);
        }
    }
}
