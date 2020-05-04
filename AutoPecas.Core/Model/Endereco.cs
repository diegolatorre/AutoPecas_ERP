using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Endereco
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdContato { get; set; }

        [DataMember]
        public string Logradouro { get; set; }

        [DataMember]
        public string Uf { get; set; }

        [DataMember]
        public string Bairro { get; set; }

        [DataMember]
        public string Complemento { get; set; }

        [DataMember]
        public Contato Contato { get; set; }
    }
}