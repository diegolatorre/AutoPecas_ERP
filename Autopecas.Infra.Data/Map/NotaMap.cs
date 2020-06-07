using AutoPecas.Core.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Autopecas.Infra.Data.Map
{
    internal class NotaMap : IEntityTypeConfiguration<Nota>
    {
        public void Configure(EntityTypeBuilder<Nota> builder)
        {
            builder
                .ToTable("NOTAS")
                .HasKey(p => p.Id);

            builder
                .Property(p => p.Id)
                .HasColumnName("IDNOTA")
                .UseIdentityColumn()
                .IsRequired();

            builder
                .Property(p => p.IdContatoOrigem)
                .HasColumnName("IDCONTATOORIGEM");

            builder
                 .Property(p => p.IdContatoDestino)
                 .HasColumnName("IDCONTATODESTINO");

            builder
                .Property(p => p.ChaveAcesso)
                .HasColumnName("CHAVEACESSO")
                .IsRequired();

            builder
                .Property(p => p.Tipo)
                .HasColumnName("TIPO")
                .IsRequired();

            builder
                .Property(p => p.Observacao)
                .HasColumnName("OBSERVACAO");

            builder
                .HasOne(p => p.ContatoOrigem)
                .WithMany(p => p.NotasOrigem)
                .HasForeignKey(p => p.IdContatoOrigem);

            builder
                .HasOne(p => p.ContatoDestino)
                .WithMany(p => p.NotasDestino)
                .HasForeignKey(p => p.IdContatoDestino);
        }
    }
}
