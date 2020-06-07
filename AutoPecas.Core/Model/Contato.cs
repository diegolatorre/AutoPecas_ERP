using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace AutoPecas.Core.Model
{
    [DataContract]
    public class Contato
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Nome { get; set; }

        [DataMember]
        public string Apelido { get; set; }

        [DataMember]
        public string Cpf { get; set; }

        [DataMember]
        public string Rg { get; set; }

        [DataMember]
        public char Tipo { get; set; }

        [DataMember]
        public string Profissao { get; set; }

        [DataMember]
        public DateTime? DataNascimento { get; set; }

        [DataMember]
        public string Sexo { get; set; }
        [DataMember]
        public string Observacao { get; set; }

        [DataMember]
        public bool Ativo { get; set; }

        [DataMember]
        public ICollection<Telefone> Telefones { get; set; }

        [DataMember]
        public ICollection<Endereco> Enderecos { get; set; }

        [DataMember]
        public ICollection<Nota> NotasOrigem { get; set; }

        [DataMember]
        public ICollection<Nota> NotasDestino { get; set; }
    }
}
