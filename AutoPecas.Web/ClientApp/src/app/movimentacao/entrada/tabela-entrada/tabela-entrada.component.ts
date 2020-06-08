import { Component, OnInit } from '@angular/core';
import Entrada from 'src/app/model/notas/entrada.model';
import { NotaService } from 'src/app/service/nota.service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';

@Component({
  selector: 'app-tabela-entrada',
  templateUrl: './tabela-entrada.component.html',
  styleUrls: ['./tabela-entrada.component.css']
})
export class TabelaEntradaComponent implements OnInit {

  constructor(
    private service: NotaService
  ) { }

  entradas: Entrada[];

  filtro = {
    pagina: 1,
    tamanho: 5,
    total: null,
    filtros: {},
  } as FiltroSpec;

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.service.listar(this.filtro).subscribe(next => {
      this.entradas = next.lista;
    });
  }

}
