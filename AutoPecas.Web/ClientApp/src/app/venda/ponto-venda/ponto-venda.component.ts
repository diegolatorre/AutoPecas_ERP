import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { Contato } from 'src/app/model/contato/contato.model';
import { Venda } from 'src/app/model/venda/venda.model.model';
import { NzModalService } from 'ng-zorro-antd/modal';
import { SelecionaProdutoComponent } from '../seleciona-produto/seleciona-produto.component';
import { ProdutoVenda } from 'src/app/model/venda/produto-venda.model';

@Component({
  selector: 'app-ponto-venda',
  templateUrl: './ponto-venda.component.html',
  styleUrls: ['./ponto-venda.component.css']
})
export class PontoVendaComponent implements OnInit {
  produtos: ProdutoVenda[] = [];
  produtosExibicao: ProdutoVenda[] = [];
  venda = {
    contato: { } as Contato
  } as Venda;

  filtro = {
    pagina: 1,
    tamanho: 8,
    total: null,
  } as FiltroSpec;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modal: NzModalService
  ) { }

  ngOnInit(): void {
  }

  contatoSelecionado(contato: Contato) {
    this.venda.contato = contato;
  }

  paginar(pagina: number) {
    this.filtro.pagina = pagina;
    this.produtosExibicao = this.produtos.slice((this.filtro.pagina - 1) * this.filtro.tamanho, this.filtro.tamanho * this.filtro.pagina);
  }

  selecionaProduto() {
    console.log('teste');
    const selecionaModal = this.modal.create({
      nzTitle: 'Filtragem de produtos',
      nzContent: SelecionaProdutoComponent,
      nzWidth: '80%',
      nzFooter: [
        {
          label: 'Cancelar',
          shape: 'round',
          onClick: () => selecionaModal.destroy()
        },
        {
          label: 'Adicionar',
          type: 'primary',
          shape: 'round',
          onClick: modal => { modal.fechar() }
        }
      ],
      nzClosable: false
    });

    selecionaModal.afterClose.subscribe(produto => {
      if (produto) {
        this.produtos.push(produto);
        console.log(this.produtos);
        this.paginar(this.filtro.pagina);
      }
    });
  }
}
