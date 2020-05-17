import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../model/produto/categoria.model';

@Injectable({
  providedIn: 'root',
})

export class CategoriaService {
  private readonly apiEndpoint = `http://localhost:50595/api/categoria`;

  constructor(private httpClient: HttpClient) { }

  public busca(texto: string): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.apiEndpoint}/busca/${texto}`);
  }
}
