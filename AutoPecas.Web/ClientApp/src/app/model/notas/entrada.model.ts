import { Contato } from '../contato/contato.model';
import { ProdutoNota } from './produto-nota.model';

export default interface Entrada {
    id?: number;
    idContatoOrigem?: number;
    idContatoDestino?: number;
    chaveAcesso?: string;
    tipo?: number;
    observacao?: string;
    contatoOrigem?: Contato;
    contatoDestino?: Contato;
    produtos?: ProdutoNota[];
}
