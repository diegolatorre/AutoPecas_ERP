import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Marca } from '../model/produto/marca.model';

@Injectable({
  providedIn: 'root',
})

export class MarcaService {
  private readonly apiEndpoint = `http://localhost:50595/api/marca`;

  constructor(private httpClient: HttpClient) { }

  public busca(texto: string): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>(`${this.apiEndpoint}/busca/${texto}`);
  }
}
