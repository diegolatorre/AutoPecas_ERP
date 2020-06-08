using System.Collections.Generic;
using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Nota
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdContatoOrigem { get; set; }

        [DataMember]
        public int IdContatoDestino { get; set; }

        [DataMember]
        public string ChaveAcesso { get; set; }

        [DataMember]
        public TipoNota Tipo { get; set; }

        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public ICollection<ProdutoNota> Produtos { get; set; }

        [DataMember]
        public Contato ContatoOrigem { get; set; }

        [DataMember]
        public Contato ContatoDestino { get; set; }
    }
}
