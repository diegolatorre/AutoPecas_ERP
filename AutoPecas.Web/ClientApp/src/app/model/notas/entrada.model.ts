import { Produto } from '../produto/produto.model';
import { Contato } from '../contato/contato.model';

export default interface Entrada {
    codigo: String;
    produtos: ProdutoEntrada[];
    fornecedor: Contato;
    observacao: String;
}

export interface ProdutoEntrada {
    produto: Produto;
    quantidade: Number;
}
