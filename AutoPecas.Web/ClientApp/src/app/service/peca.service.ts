import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class PecaService {
  private readonly apiEndpoint = `http://localhost:50595/api/testepeca`;

  constructor(private httpClient: HttpClient) { }

  public listar(): Observable<any> {
    return this.httpClient.get<any[]>(`${this.apiEndpoint}/lista`);
  }
}
