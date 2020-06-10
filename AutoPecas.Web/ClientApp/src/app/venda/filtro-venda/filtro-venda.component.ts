import { Component, OnInit, Input, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Contato } from 'src/app/model/contato/contato.model';
import { StatusVendaEnum } from 'src/app/model/enum/statusVenda.enum';
import { AutoCompleteContatoComponent } from 'src/app/shared/auto-complete/auto-complete-contato/auto-complete-contato.component';

@Component({
  selector: 'app-filtro-venda',
  templateUrl: './filtro-venda.component.html',
  styleUrls: ['./filtro-venda.component.css']
})
export class FiltroVendaComponent implements OnInit, AfterViewInit {
  filtroForm = new FormGroup(
  {
      idContato: new FormControl(null),
      statusAberto: new FormControl(true),
      statusFinalizada: new FormControl(true),
      dataAberturaInicial: new FormControl(null),
      dataAberturaFinal: new FormControl(null),
      dataFinalizacaoInicial: new FormControl(null),
      dataFinalizacaoFinal: new FormControl(null),
      valorInicial: new FormControl(0),
      valorFinal: new FormControl(50000),
  });

  statusVendaEnum = StatusVendaEnum;

  statusCheckbox = [
    { label: 'Em Aberto', value: this.statusVendaEnum.Aberta, checked: true, disabled: false },
    { label: 'Finalizada', value: this.statusVendaEnum.Finalizada, checked: true, disabled: false },
  ];

  minRange = 0;
  maxRange = 50000;
  rangeValue = [0, 50000];

  dateRangeAbertura = [];
  dateRangeFinalizacao = [];

  @Input() filtro?: any;

  @ViewChild('AutoCompleteContato') autoCompleteContato: AutoCompleteContatoComponent;

  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
    this.filtroForm.patchValue({
      idContato: this.filtro.idContato,
      statusAberto: this.filtro.statusAberto,
      statusFinalizada: this.filtro.statusFinalizada,
      dataAberturaInicial: this.filtro.dataAberturaInicial,
      dataAberturaFinal: this.filtro.dataAberturaFinal,
      dataFinalizacaoInicial: this.filtro.dataFinalizacaoInicial,
      dataFinalizacaoFinal: this.filtro.dataFinalizacaoFinal,
      valorInicial: this.filtro.valorInicial,
      valorFinal: this.filtro.valorFinal,
    });

    this.rangeValue = [this.filtro.valorInicial, this.filtro.valorFinal];

    if (this.filtro.dataAberturaInicial || this.filtro.dataAberturaFinal)
      this.dateRangeAbertura = [this.filtro.dataAberturaInicial, this.filtro.dataAberturaFinal];

    if (this.filtro.dataFinalizacaoInicial || this.filtro.dataFinalizacaoFinal)
      this.dateRangeFinalizacao = [this.filtro.dataFinalizacaoInicial, this.filtro.dataFinalizacaoFinal];
  }

  ngAfterViewInit() {
    this.autoCompleteContato.selecionaManualmente(this.filtro.idContato);
    this.statusCheckbox[0].checked = this.filtro.statusAberto;
    this.statusCheckbox[1].checked = this.filtro.statusFinalizada;
    this.selecionaStatus();
  }

  limpar(): void {
    this.filtroForm.reset();
    this.rangeValue = [0, 50000];
    this.dateRangeAbertura = [];
    this.dateRangeFinalizacao = [];
    this.statusCheckbox[0].checked = true;
    this.statusCheckbox[1].checked = true;
    this.autoCompleteContato.selecionaManualmente();
    this.selecionaStatus();
  }

  filtrar(): void {
    this.modal.destroy(this.filtroForm.value);
  }

  selecionaContato(contato: Contato) {
    this.filtroForm.get('idContato').setValue(contato);
  }

  selecionaValor(valor: any) {
    let valorMin, valorMax;

    if (valor[0] >= valor[1]) {
      valorMax = valor[0];
      valorMin = valor[1];
    } else {
      valorMax = valor[1];
      valorMin = valor[0];
    }

    this.filtroForm.get('valorInicial').setValue(valorMin);
    this.filtroForm.get('valorFinal').setValue(valorMax);
  }

  selecionaDataAbertura(data: any) {
    this.filtroForm.get('dataAberturaInicial').setValue(data[0]);
    this.filtroForm.get('dataAberturaFinal').setValue(data[1]);
  }

  selecionaDataFinalizacao(data: any) {
    this.filtroForm.get('dataFinalizacaoInicial').setValue(data[0]);
    this.filtroForm.get('dataFinalizacaoFinal').setValue(data[1]);
  }

  selecionaStatus() {
    this.filtroForm.get('statusAberto').setValue(this.statusCheckbox[0].checked);
    this.filtroForm.get('statusFinalizada').setValue(this.statusCheckbox[1].checked);
    if (!this.statusCheckbox[0].checked) {
      this.statusCheckbox[1].disabled = true;
    }

    if (this.statusCheckbox[0].checked) {
      this.statusCheckbox[1].disabled = false;
    }

    if (!this.statusCheckbox[1].checked) {
      this.statusCheckbox[0].disabled = true;
    }

    if (this.statusCheckbox[1].checked) {
      this.statusCheckbox[0].disabled = false;
    }
  }

}
