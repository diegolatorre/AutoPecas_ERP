import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Venda } from "../model/venda/venda.model.model";
import { FiltroSpec } from "../model/geral/filtro-spec.model";
import { PaginacaoResultado } from "../model/geral/paginacao-resultado.model";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class VendaService {
  private readonly apiEndpoint = `${environment.apiUrl}venda`;

  constructor(private httpClient: HttpClient) {}

  public listar(filtro: FiltroSpec) {
    return this.httpClient.post<PaginacaoResultado<Venda>>(
      `${this.apiEndpoint}/lista/`,
      filtro
    );
  }

  public obter(idVenda: number): Observable<Venda> {
    return this.httpClient.get<Venda>(`${this.apiEndpoint}/${idVenda}`);
  }

  public criar(venda: Venda) {
    return this.httpClient.post<Venda>(`${this.apiEndpoint}`, venda);
  }

  public editar(venda: Venda) {
    return this.httpClient.put<Venda>(`${this.apiEndpoint}`, venda);
  }
}
