import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Contato } from 'src/app/model/contato/contato.model';

@Component({
  selector: 'app-filtro-venda',
  templateUrl: './filtro-venda.component.html',
  styleUrls: ['./filtro-venda.component.css']
})
export class FiltroVendaComponent implements OnInit {
  filtroForm = new FormGroup(
  {
      idContato: new FormControl(null),
      status: new FormControl(null),
      dataAberturaInicial: new FormControl(null),
      dataAberturaFinal: new FormControl(null),
      dataFinalizacaoInicial: new FormControl(null),
      dataFinalizacaoFinal: new FormControl(null),
      valorInicial: new FormControl(0),
      valorFinal: new FormControl(50000),
  });

  minRange = 0;
  maxRange = 50000;
  rangeValue = [0, 50000];

  @Input() filtro?: any;

  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  limpar(): void {
    this.filtroForm.reset();
  }

  filtrar(): void {
    this.modal.destroy(this.filtroForm.value);
  }

  selecionaContato(contato: Contato) {
    this.filtroForm.get('idContato').setValue(contato.id);
  }

  onAfterChange(valor: any) {
    this.filtroForm.get('valorInicial').setValue(valor[0]);
    this.filtroForm.get('valorFinal').setValue(valor[1]);
    console.log(this.filtroForm.value);
  }

}
