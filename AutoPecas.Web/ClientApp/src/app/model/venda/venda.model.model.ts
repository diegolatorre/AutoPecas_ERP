import { Contato } from "../contato/contato.model";
import { ProdutoVenda } from "./produto-venda.model";

export interface Venda {
  id?: number;
  idContato?: number;
  status?: string;
  dataCriacao?: Date;
  dataFinalizacao?: Date;
  desconto?: number;
  ativo?: boolean;
  contato?: Contato;
  produtos?: ProdutoVenda[];
}
