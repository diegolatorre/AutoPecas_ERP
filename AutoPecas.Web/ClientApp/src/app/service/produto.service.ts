import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto/produto.model';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';
import { Marca } from '../model/produto/marca.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ProdutoService {
  private readonly apiEndpoint = `${environment.apiUrl}produto`;

  constructor(private httpClient: HttpClient) { }

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Produto>>(
      `${this.apiEndpoint}/lista/`,
      filtro
    );
  }

  public busca(texto: string): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.apiEndpoint}/busca/${texto}`);
  }

  public obter(idProduto: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.apiEndpoint}/${idProduto}`);
  }

  public incluir(produto: Produto): Observable<number> {
    return this.httpClient.post<number>(`${this.apiEndpoint}`, produto);
  }

  public editar(produto: Produto): Observable<number> {
    return this.httpClient.put<number>(`${this.apiEndpoint}`, produto);
  }
}
