import { Contato } from '../contato/contato.model';
import { ProdutoNota } from './produto-nota.model';

export default interface Entrada {
    id?: number;
    idContato?: number;
    chaveAcesso?: string;
    observacao?: string;
    contato?: Contato;
    produtos?: ProdutoNota[];
}
