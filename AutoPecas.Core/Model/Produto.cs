using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Produto
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Descricao { get; set; }

        [DataMember]
        public string CodigoBarras { get; set; }

        [DataMember]
        public int IdCategoria { get; set; }

        [DataMember]
        public int IdMarca { get; set; }

        [DataMember]
        public decimal ValorCusto { get; set; }

        [DataMember]
        public decimal ValorVenda { get; set; }

        [DataMember]
        public decimal? Lucro { get; set; }

        [DataMember]
        public int? EstoqueMinimo { get; set; }

        [DataMember]
        public int? EstoqueMaximo { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public bool Ativo { get; set; }

        [DataMember]
        public Marca Marca { get; set; }

        [DataMember]
        public Categoria Categoria { get; set; }

        [DataMember]
        public ICollection<ProdutoNota> Notas { get; set; }

        [DataMember]
        public int? Quantidade { get; set; }
    }
}
