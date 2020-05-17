using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class TelefoneMap : IEntityTypeConfiguration<Telefone>
    {
        public void Configure(EntityTypeBuilder<Telefone> builder)
        {
            builder
                .ToTable("TELEFONE")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDTELEFONE")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdContato)
                .HasColumnName("IDCONTATO")
                .IsRequired();

            builder
                .Property(p => p.Tipo)
                .HasColumnName("TIPO");

            builder
                .Property(p => p.Numero)
                .HasColumnName("NUMERO")
                .IsRequired();

            builder
                .HasOne(p => p.Contato)
                .WithMany(p => p.Telefones)
                .HasForeignKey(p => p.IdContato);
        }
    }
}
