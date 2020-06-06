import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Contato } from 'src/app/model/contato/contato.model';
import { FormGroup, FormControl } from '@angular/forms';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ContatoService } from 'src/app/service/contato.service';
import { CadastroContatoComponent } from '../cadastro-contato/cadastro-contato.component';

@Component({
  selector: 'app-tabela-contato',
  templateUrl: './tabela-contato.component.html',
  styleUrls: ['./tabela-contato.component.css']
})
export class TabelaContatoComponent implements OnInit {
  contatos: Contato[];
  contatoDetalhes: Contato = { telefones: [], enderecos: [] } as Contato;

  filtroForm = new FormGroup(
    {
      descricao: new FormControl(null),
    });

  filtro = {
    pagina: 1,
    tamanho: 12,
    total: null,
    filtros: {},
  } as FiltroSpec;

  visible = false;

  constructor(
    private modal: NzModalService,
    private contatoService: ContatoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.contatoService.listar(this.filtro).subscribe(next => {
      this.filtro.total = next.total;
      this.contatos = next.lista;
      this.changeDetectorRef.markForCheck();
    });
  }

  paginar(pagina: number) {
    this.filtro.pagina = pagina;
    this.listar();
  }

  detalhes(contato?: Contato) {
    contato ? this.contatoDetalhes = contato : null;
    this.visible = !this.visible;
  }

  // filtrar() {
  //   let l = true;
  //   const filtroModal = this.modal.create({
  //     nzTitle: 'Filtragem de produtos',
  //     nzContent: FiltroProdutoComponent,
  //     nzComponentParams: {
  //      filtro: this.filtroForm.value
  //     },
  //     nzFooter: [
  //       {
  //         label: 'Fechar',
  //         shape: 'round',
  //         onClick: () => filtroModal.destroy()
  //       },
  //       {
  //         label: 'Limpar',
  //         type: 'danger',
  //         shape: 'round',
  //         onClick: modal => { modal.limpar() }
  //       },
  //       {
  //         label: 'Filtrar',
  //         type: 'primary',
  //         shape: 'round',
  //         onClick: modal => { modal.filtrar() }
  //       }
  //     ],
  //     nzClosable: false
  //   });

  //   filtroModal.afterClose.subscribe(filtro => {
  //     if (filtro) {
  //       this.filtroForm.patchValue({
  //         descricao: filtro.descricao
  //       });

  //       Object.entries(filtro).forEach((f) => {
  //         if (f[1] != null) {
  //           const value = f[1] as any;
  //           value.id ? this.filtro.filtros[f[0]] = value.id : this.filtro.filtros[f[0]] = value;
  //         } else {
  //           delete this.filtro.filtros[f[0]];
  //         }
  //       });

  //       this.filtro.pagina = 1;
  //       this.filtro.total = null;
  //       this.listar();
  //     }
  //   });
  // }

  cadastrar(contato?: Contato) {
    const cadastroModal = this.modal.create({
      nzTitle: 'Novo Contato',
      nzContent: CadastroContatoComponent,
      nzComponentParams: {
       editarContato: contato
      },
      nzWidth: '80%',
      nzFooter: null,
      nzClosable: false
    });

    cadastroModal.afterClose.subscribe(() => this.listar());
  }
}
