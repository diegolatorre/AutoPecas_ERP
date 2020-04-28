using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class PecaMap : IEntityTypeConfiguration<Peca>
    {
        public void Configure(EntityTypeBuilder<Peca> builder)
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
                .Property(p => p.Valor)
                .HasColumnName("VALOR")
                .IsRequired();
        }
    }
}
