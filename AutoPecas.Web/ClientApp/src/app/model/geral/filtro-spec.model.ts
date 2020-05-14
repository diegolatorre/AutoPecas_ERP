import { PaginacaoSpec } from './paginacao-spec.model';

export interface FiltroSpec extends PaginacaoSpec {
  filtros?: { [key: string]: any };
}
