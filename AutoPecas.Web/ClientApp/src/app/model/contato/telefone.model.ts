import { Contato } from "./contato.model";

export interface Telefone {
  id: number;
  idContato: number;
  tipo: string;
  numero: string;
  contato: Contato;
}
