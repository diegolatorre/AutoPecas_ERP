import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/model/venda/venda.model.model';
import { VendaService } from 'src/app/service/venda.service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { Router } from '@angular/router';
import { StatusVendaLabel, StatusVendaEnum } from 'src/app/model/enum/statusVenda.enum';

@Component({
  selector: 'app-lista-venda',
  templateUrl: './lista-venda.component.html',
  styleUrls: ['./lista-venda.component.css']
})
export class ListaVendaComponent implements OnInit {
  vendas: Venda[];

  statusVendaLabel = StatusVendaLabel;
  statusVendaEnum = StatusVendaEnum;

  gridStyle = {
    width: '50%',
    textAlign: 'center'
  };

  filtro = {
    pagina: 1,
    tamanho: 12,
    total: null,
    filtros: { },
  } as FiltroSpec;

  constructor(
    private vendaService: VendaService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.vendaService.listar(this.filtro).subscribe(next => {
      this.filtro.total = next.total;
      this.vendas = next.lista;
    });
  }

  paginar(pagina: number) {
    this.filtro.pagina = pagina;
    this.listar();
  }

  novaVenda() {
    this.router.navigate(['venda']);
  }

}
