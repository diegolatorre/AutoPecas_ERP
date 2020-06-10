import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';
import { Marca } from '../model/produto/marca.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class MarcaService {
  private readonly apiEndpoint = `${environment.apiUrl}marca`;

  constructor(private httpClient: HttpClient) { }

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Marca>>(`${this.apiEndpoint}/lista/`, filtro);
  }

  public busca(texto: string): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>(`${this.apiEndpoint}/busca/${texto}`);
  }

  public obter(id: number): Observable<Marca> {
    return this.httpClient.get<Marca>(`${this.apiEndpoint}/${id}`);
  }

  public incluir(marca: Marca): Observable<number> {
    return this.httpClient.post<number>(`${this.apiEndpoint}`, marca);
  }

  public editar(marca: Marca): Observable<number> {
    return this.httpClient.put<number>(`${this.apiEndpoint}`, marca);
  }
}
