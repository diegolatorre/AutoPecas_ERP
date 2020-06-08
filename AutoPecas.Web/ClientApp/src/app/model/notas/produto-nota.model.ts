import { Produto } from '../produto/produto.model';

export interface ProdutoNota {
  idProdutoNota?: number;
  idNota?: number;
  idProduto: number;
  quantidade: Number;
  produto: Produto;
}
