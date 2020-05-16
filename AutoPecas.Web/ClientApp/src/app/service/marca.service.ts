import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto.model';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';
import { Marca } from '../model/marca.model';

@Injectable({
  providedIn: 'root',
})

export class MarcaService {
  private readonly apiEndpoint = `http://localhost:50595/api/marca`;

  constructor(private httpClient: HttpClient) { }

  public busca(value: string): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>(`${this.apiEndpoint}/buscamarca/${value}`);
  }
}
