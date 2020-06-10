import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FiltroSpec } from '../model/geral/filtro-spec.model';
import { PaginacaoResultado } from '../model/geral/paginacao-resultado.model';
import Usuario from '../model/usuario/usuario.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})

export class UsuarioService {
  private readonly apiEndpoint = `${environment.apiUrl}usuario`;

  constructor(private httpClient: HttpClient) { }

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Usuario>>(`${this.apiEndpoint}/lista/`, filtro);
  }

  public busca(texto: string): Observable<Usuario[]> {
    return this.httpClient.get<Usuario[]>(`${this.apiEndpoint}/busca/${texto}`);
  }

  public obter(id: number): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.apiEndpoint}/${id}`);
  }

  public incluir(usuario: Usuario): Observable<number> {
    console.log(usuario);

    return this.httpClient.post<number>(`${this.apiEndpoint}`, usuario);
  }

  public editar(usuario: Usuario): Observable<number> {
    console.log(usuario);

    return this.httpClient.put<number>(`${this.apiEndpoint}`, usuario);
  }

  public login(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    
    return this.httpClient.post<Usuario>(`${this.apiEndpoint}/login`, usuario);
  }
}
