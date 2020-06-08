import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';
import Entrada from '../model/notas/entrada.model';

@Injectable({
  providedIn: 'root',
})
export class NotaService {
  private readonly apiEndpoint = `http://localhost:50595/api/nota`;

  constructor(private httpClient: HttpClient) {}

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Entrada>>(
      `${this.apiEndpoint}/entrada/lista/`,
      filtro
    );
  }

  public finalizar(entrada: Entrada) {
    return this.httpClient.post<Entrada>(`${this.apiEndpoint}/entrada`, entrada);
  }
}
