import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root',
})

export class ProdutoService {
  private readonly apiEndpoint = `http://localhost:50595/api/produto`;

  constructor(private httpClient: HttpClient) { }

  public listar(): Observable<Produto[]> {
    return this.httpClient.get<Produto[]>(`${this.apiEndpoint}/lista`);
  }

  public obter(idProduto: number): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.apiEndpoint}/${idProduto}`);
  }

  public incluir(produto: Produto): Observable<number> {
    return this.httpClient.post<number>(`${this.apiEndpoint}`, produto);
  }
}
