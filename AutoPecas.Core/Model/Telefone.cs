using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Telefone
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public int IdContato { get; set; }

        [DataMember]
        public string Tipo { get; set; }

        [DataMember]
        public string Numero { get; set; }
        
        [DataMember]
        public Contato Contato { get; set; }
    }
}
