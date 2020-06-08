import { Telefone } from "./telefone.model";
import { Endereco } from "./endereco.model";

export interface Contato {
  id?: number;
  nome?: string;
  apelido?: string;
  cpf?: string;
  rg?: string;
  tipo?: string;
  profissao?: string;
  dataNascimento?: Date;
  sexo?: string;
  observacao?: string;
  ativo?: boolean;
  telefones?: Telefone[];
  enderecos?: Endereco[];
}
