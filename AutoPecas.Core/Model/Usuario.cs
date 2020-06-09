using Newtonsoft.Json;
using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    public class Usuario
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Nome { get; set; }

        [DataMember]
        [JsonProperty("usuario")]
        public string NomeUsuario { get; set; }

        [DataMember]
        public string Senha { get; set; }

        [DataMember]
        public bool Ativo { get; set; }

        [DataMember]
        public bool Permissao { get; set; }
    }
}
