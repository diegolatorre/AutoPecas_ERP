import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Produto } from 'src/app/model/produto/produto.model';
import { ProdutoService } from 'src/app/service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FiltroProdutoComponent } from '../filtro-produto/filtro-produto.component';
import { FormGroup, FormControl } from '@angular/forms';
import { CadastroProdutoComponent } from '../cadastro-produto/cadastro-produto.component';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.css']
})
export class TabelaProdutoComponent implements OnInit {
  produtos: Produto[];
  produtoDetalhes: Produto = { marca: { }, categoria: { } } as Produto;

  filtroForm = new FormGroup(
    {
      descricao: new FormControl(null),
    });

  filtro = {
    pagina: 1,
    tamanho: 12,
    total: null,
    filtros: { },
  } as FiltroSpec;

  visible = false;

  constructor(
    private modal: NzModalService,
    private produtoService: ProdutoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.produtoService.listar(this.filtro).subscribe(next => {
      console.log(next.lista);
      this.filtro.total = next.total;
      this.produtos = next.lista;

    });
  }

  paginar(pagina: number) {
    this.filtro.pagina = pagina;
    this.listar();
  }

  detalhes(produto?: Produto) {
    produto ? this.produtoDetalhes = produto : null;
    this.visible = !this.visible;
  }

  filtrar() {
    let l = true;
    const filtroModal = this.modal.create({
      nzTitle: 'Filtragem de produtos',
      nzContent: FiltroProdutoComponent,
      nzWidth: 800,
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
          descricao: filtro.descricao
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
    this.filtro.filtros = { };
    this.filtro.total = null;
    this.listar();
  }

  cadastrar(produto?: Produto) {
    const cadastroModal = this.modal.create({
      nzTitle: 'Novo Produto',
      nzContent: CadastroProdutoComponent,
      nzComponentParams: {
       editarProduto: produto
      },
      nzWidth: '80%',
      nzFooter: null,
      nzClosable: false,
      nzMaskClosable: false
    });

    cadastroModal.afterClose.subscribe(filtro => this.listar());
  }
}
