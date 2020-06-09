import { Categoria } from './categoria.model';
import { Marca } from './marca.model';

export interface Produto {
  id: number;
  descricao: string;
  codigoBarras: string;
  idCategoria: number;
  idMarca: number;
  valorCusto: number;
  valorVenda: number;
  lucro?: number;
  estoqueMinimo: number;
  estoqueMaximo: number;
  observacao: string;
  categoria: Categoria;
  marca: Marca;
  quantidade?: number;
}
