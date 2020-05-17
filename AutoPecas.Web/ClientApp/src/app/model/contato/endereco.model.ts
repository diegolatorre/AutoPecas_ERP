import { Contato } from "./contato.model";

export interface Endereco {
  id: number;
  idContato: number;
  logradouro: string;
  uf: string;
  bairro: string;
  complemento: string;
  contato: Contato;
}
