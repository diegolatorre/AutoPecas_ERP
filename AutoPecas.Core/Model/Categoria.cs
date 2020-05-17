using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Categoria
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Nome { get; set; }

        [DataMember]
        public string Descricao { get; set; }
    }
}
