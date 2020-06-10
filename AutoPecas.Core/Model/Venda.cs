using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Venda
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdContato { get; set; }

        [DataMember]
        public StatusVenda Status { get; set; }

        [DataMember]
        public DateTime DataCriacao { get; set; }

        [DataMember]
        public DateTime DataFinalizacao { get; set; }

        [DataMember]
        public float Desconto { get; set; }

        [DataMember]
        public float Valor { get; set; }

        [DataMember]
        public Contato Contato { get; set; }

        [DataMember]
        public ICollection<ProdutoVenda> Produtos { get; set; }
    }
}
