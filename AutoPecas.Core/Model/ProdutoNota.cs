using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class ProdutoNota
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdNota { get; set; }

        [DataMember]
        public int IdProduto { get; set; }

        [DataMember]
        public int Quantidade { get; set; }

        [DataMember]
        public Produto Produto { get; set; }

        [DataMember]
        public Nota Nota { get; set; }
    }
}
