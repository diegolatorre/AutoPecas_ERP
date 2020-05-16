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

export class ProdutoService {
  private readonly apiEndpoint = `http://localhost:50595/api/produto`;

  constructor(private httpClient: HttpClient) { }

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Produto>>(
      `${this.apiEndpoint}/lista/`,
      filtro
    );
  }

  public obter(idProduto: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.apiEndpoint}/${idProduto}`);
  }

  public incluir(produto: Produto): Observable<number> {
    return this.httpClient.post<number>(`${this.apiEndpoint}`, produto);
  }

  public busca(value: string): Observable<Marca[]> {
    return this.httpClient.get<Marca[]>(`${this.apiEndpoint}/buscamarca/${value}`);
  }
}
