import { Contato } from "../contato/contato.model";
import { Produto } from "../produto/produto.model";

export interface Venda {
  id?: number;
  idContato?: number;
  status?: string;
  dataCariacao?: Date;
  dataFinalizacao?: Date;
  desconto?: number;
  ativo?: boolean;
  contato?: Contato;
  produtos?: Produto[];
}
