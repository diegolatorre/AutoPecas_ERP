import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../model/categoria.model';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
  private readonly apiEndpoint = `http://localhost:50595/api/categoria`;

  constructor(private httpClient: HttpClient) { }

  public listar(filtro: FiltroSpec) {
    return this.httpClient.get<Categoria[]>(`${this.apiEndpoint}/lista/`);
  }
  public search(content: string) {

    console.log(JSON.parse(content));
    

    return this.httpClient.get<Categoria[]>(`${this.apiEndpoint}/search/`);
  }

  public obter(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${this.apiEndpoint}/${id}`);
  }

  public incluir(categoria: Categoria): Observable<number> {

    console.log(categoria);
    

    return this.httpClient.post<number>(`${this.apiEndpoint}`, categoria);
  }
}
