import { Contato } from "../contato/contato.model";
import { ProdutoVenda } from "./produto-venda.model";
import { StatusVendaEnum } from "../enum/statusVenda.enum";

export interface Venda {
  id?: number;
  idContato?: number;
  status?: StatusVendaEnum;
  dataCriacao?: Date;
  dataFinalizacao?: Date;
  desconto?: number;
  ativo?: boolean;
  contato?: Contato;
  produtos?: ProdutoVenda[];
}
