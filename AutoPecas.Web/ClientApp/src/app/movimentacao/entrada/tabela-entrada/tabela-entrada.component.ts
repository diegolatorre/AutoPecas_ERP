import { Component, OnInit } from '@angular/core';
import Entrada from 'src/app/model/notas/entrada.model';
import { NotaService } from 'src/app/service/nota.service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CadastroEntradaComponent } from '../cadastro-entrada/cadastro-entrada.component';

@Component({
  selector: 'app-tabela-entrada',
  templateUrl: './tabela-entrada.component.html',
  styleUrls: ['./tabela-entrada.component.css']
})
export class TabelaEntradaComponent implements OnInit {
  notas: Entrada[];

  constructor(
    private notaService: NotaService,
    private modal: NzModalService,
  ) { }

  entradas: Entrada[];

  filtro = {
    pagina: 1,
    tamanho: 8,
    total: null,
    filtros: {},
  } as FiltroSpec;

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.notaService.listar(this.filtro).subscribe(next => {
      this.filtro.total = next.total;
      this.notas = next.lista;
    });
  }

  paginar(pagina: number) {
    this.filtro.pagina = pagina;
    this.listar();
  }

  cadastrar(nota?: Entrada) {
    const cadastroModal = this.modal.create({
      nzTitle: 'Visualizar Nota',
      nzContent: CadastroEntradaComponent,
      nzComponentParams: {
       visualizarNota: nota
      },
      nzWidth: '80%',
      nzFooter: null,
      nzClosable: false
    });

    cadastroModal.afterClose.subscribe(() => this.listar());
  }

}
