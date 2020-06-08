import { Venda } from "./venda.model.model";
import { Produto } from "../produto/produto.model";

export interface ProdutoVenda {
  idProdutoVenda?: number;
  idVenda?: number;
  idProduto?: number;
  quantidade?: number;
  desconto?: number;
  valorFinal?: number;
  venda?: Venda;
  produto?: Produto;
}
