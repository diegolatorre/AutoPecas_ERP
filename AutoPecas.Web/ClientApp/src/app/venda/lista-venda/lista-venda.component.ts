import { Component, OnInit } from '@angular/core';
import { Venda } from 'src/app/model/venda/venda.model.model';
import { VendaService } from 'src/app/service/venda.service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { Router } from '@angular/router';
import { StatusVendaLabel, StatusVendaEnum } from 'src/app/model/enum/statusVenda.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FiltroVendaComponent } from '../filtro-venda/filtro-venda.component';

@Component({
  selector: 'app-lista-venda',
  templateUrl: './lista-venda.component.html',
  styleUrls: ['./lista-venda.component.css']
})
export class ListaVendaComponent implements OnInit {
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

  vendas: Venda[];

  statusVendaLabel = StatusVendaLabel;
  statusVendaEnum = StatusVendaEnum;

  gridStyle = {
    width: '50%',
    textAlign: 'center'
  };

  filtro = {
    pagina: 1,
    tamanho: 8,
    total: null,
    filtros: { },
  } as FiltroSpec;

  constructor(
    private vendaService: VendaService,
    private router: Router,
    private modal: NzModalService,
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

  filtrar() {
    const filtroModal = this.modal.create({
      nzTitle: 'Filtragem de vendas',
      nzContent: FiltroVendaComponent,
      nzWidth: '60%',
      nzComponentParams: {
       filtro: this.filtroForm.value
      },
      nzFooter: [
        {
          label: 'Fechar',
          shape: 'round',
          onClick: () => filtroModal.destroy()
        },
        {
          label: 'Limpar',
          type: 'danger',
          shape: 'round',
          onClick: modal => { modal.limpar() }
        },
        {
          label: 'Filtrar',
          type: 'primary',
          shape: 'round',
          onClick: modal => { modal.filtrar() }
        }
      ],
      nzClosable: false
    });

    filtroModal.afterClose.subscribe(filtro => {
      if (filtro) {
        this.filtroForm.patchValue({
          idContato: filtro.idContato,
          statusAberto: filtro.statusAberto,
          statusFinalizada: filtro.statusFinalizada,
          dataAberturaInicial: filtro.dataAberturaInicial,
          dataAberturaFinal: filtro.dataAberturaFinal,
          dataFinalizacaoInicial: filtro.dataFinalizacaoInicial,
          dataFinalizacaoFinal: filtro.dataFinalizacaoFinal,
          valorInicial: filtro.valorInicial,
          valorFinal: filtro.valorFinal,
        });

        Object.entries(filtro).forEach((f) => {
          if (f[1] != null) {
            const value = f[1] as any;
            value.id ? this.filtro.filtros[f[0]] = value.id : this.filtro.filtros[f[0]] = value;
          } else {
            delete this.filtro.filtros[f[0]];
          }
        });

        this.filtro.pagina = 1;
        this.filtro.total = null;
        this.listar();
      }
    });
  }

  limparFiltro() {
    this.filtroForm.reset({ statusAberto: true, statusFinalizada: true, valorInicial: 0, valorFinal: 50000 });
    this.filtro.filtros = { };
    this.filtro.total = null;
    this.listar();
  }

  novaVenda() {
    this.router.navigate(['venda']);
  }

  abrir(venda: Venda) {
    this.router.navigate(['/venda', { id: venda.id }]);
  }

}
