import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Venda } from "../model/venda/venda.model.model";
import { FiltroSpec } from "../model/geral/filtro-spec.model";
import { PaginacaoResultado } from "../model/geral/paginacao-resultado.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class VendaService {
  private readonly apiEndpoint = `http://localhost:50595/api/venda`;

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

  public finalizar(venda: Venda) {
    return this.httpClient.post<Venda>(`${this.apiEndpoint}`, venda);
  }
}
