using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Marca
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string  Nome { get; set; }

        [DataMember]
        public string Descricao { get; set; }
    }
}
