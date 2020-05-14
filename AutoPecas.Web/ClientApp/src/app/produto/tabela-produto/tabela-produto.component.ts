import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from 'src/app/service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { FiltroProdutoComponent } from '../filtro-produto/filtro-produto.component';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.css']
})
export class TabelaProdutoComponent implements OnInit {
  produtos: Produto[];
  produtoDetalhes: Produto = { marca: { }, categoria: { } } as Produto;

  filtro = {
    pagina: 1,
    tamanho: 12,
    total: null,
    filtros: {},
  } as FiltroSpec;

  visible = false;

  constructor(
    private modal: NzModalService,
    private produtoService: ProdutoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.produtoService.listar(this.filtro).subscribe(next => {
      this.filtro.total = next.total;
      this.produtos = next.lista;
      this.changeDetectorRef.markForCheck();
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
    const modal = this.modal.create({
      nzTitle: 'Modal Title',
      nzContent: FiltroProdutoComponent,
      nzGetContainer: () => document.body,
      nzOnOk: () => new Promise(resolve => setTimeout(resolve, 1000))
    });
  }
}
