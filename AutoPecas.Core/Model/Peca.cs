using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Peca
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Descricao { get; set; }

        [DataMember]
        public decimal Valor { get; set; }
    }
}
