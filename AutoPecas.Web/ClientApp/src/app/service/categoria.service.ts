import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';
import { Categoria } from '../model/produto/categoria.model';

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
  private readonly apiEndpoint = `http://localhost:50595/api/categoria`;

  constructor(private httpClient: HttpClient) { }

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Categoria>>(`${this.apiEndpoint}/lista/`, filtro);
  }

  public busca(texto: string): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.apiEndpoint}/busca/${texto}`);
  }

  public obter(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${this.apiEndpoint}/${id}`);
  }

  public incluir(categoria: Categoria): Observable<number> {
    return this.httpClient.post<number>(`${this.apiEndpoint}`, categoria);
  }
}
