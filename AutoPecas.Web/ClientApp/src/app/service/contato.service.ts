
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';
import { Contato } from '../model/contato/contato.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class ContatoService {
  private readonly apiEndpoint = `${environment.apiUrl}contato`;

  constructor(private httpClient: HttpClient) { }

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Contato>>(
      `${this.apiEndpoint}/lista/`,
      filtro
    );
  }

  public busca(texto: string): Observable<Contato[]> {
    return this.httpClient.get<Contato[]>(`${this.apiEndpoint}/busca/${texto}`);
  }

  public obter(idContato: number): Observable<Contato> {
    return this.httpClient.get<Contato>(`${this.apiEndpoint}/${idContato}`);
  }

  public incluir(contato: Contato): Observable<number> {
    return this.httpClient.post<number>(`${this.apiEndpoint}`, contato);
  }

  public editar(contato: Contato): Observable<number> {
    return this.httpClient.put<number>(`${this.apiEndpoint}`, contato);
  }
}
