import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Venda } from "../model/venda/venda.model.model";

@Injectable({
  providedIn: "root",
})
export class VendaService {
  private readonly apiEndpoint = `http://localhost:50595/api/venda`;

  constructor(private httpClient: HttpClient) {}

  public finalizar(venda: Venda) {
    return this.httpClient.post<Venda>(`${this.apiEndpoint}`, venda);
  }
}
