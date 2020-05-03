using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class MarcaMap : IEntityTypeConfiguration<Marca>
    {
        public void Configure(EntityTypeBuilder<Marca> builder)
        {
            builder
                .ToTable("MARCA")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDMARCA")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.Nome)
                .HasColumnName("NOME")
                .IsRequired();

            builder
                .Property(p => p.Descricao)
                .HasColumnName("DESCRICAO")
                .IsRequired();
        }
    }
}
