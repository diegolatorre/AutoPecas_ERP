import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';

@Component({
  selector: 'app-ponto-venda',
  templateUrl: './ponto-venda.component.html',
  styleUrls: ['./ponto-venda.component.css']
})
export class PontoVendaComponent implements OnInit {
  listOfData: any[] = [];

  filtro = {
    pagina: 1,
    tamanho: 12,
    total: null,
    filtros: {},
  } as FiltroSpec;

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listOfData = new Array(12).fill(0).map((_, index) => {
      return {
        id: index,
        name: `Edward King ${index}`,
        age: 32,
        address: `London, Park Lane no. ${index}`
      };
    });

    this.changeDetectorRef.markForCheck();

    console.log(this.listOfData);
  }
}
