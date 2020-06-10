using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Runtime.Serialization;
using System.Text;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class ProdutoVenda
    {
        [DataMember]
        public int IdProdutoVenda { get; set; }

        [DataMember]
        public int IdVenda { get; set; }

        [DataMember]
        public int IdProduto { get; set; }

        [DataMember]
        public int Quantidade { get; set; }

        [DataMember]
        public float Desconto { get; set; }

        [DataMember]
        public float ValorFinal { get; set; }

        [DataMember]
        public Venda Venda { get; set; }

        [DataMember]
        public Produto Produto { get; set; }
    }
}
