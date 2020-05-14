export interface PaginacaoResultado<T> {
  total: number;
  pagina: number;
  tamanhoPagina: number;
  lista: T[];
  totalPaginas: number;
  temAnterior: boolean;
  temProxima: boolean;
  proxima: number;
  anterior: number;
}
