import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FiltroSpec } from "src/app/model/geral/filtro-spec.model";
import { Contato } from "src/app/model/contato/contato.model";
import { Venda } from "src/app/model/venda/venda.model.model";
import { NzModalService } from "ng-zorro-antd/modal";
import { SelecionaProdutoComponent } from "../seleciona-produto/seleciona-produto.component";
import { ProdutoVenda } from "src/app/model/venda/produto-venda.model";
import { VendaService } from "src/app/service/venda.service";

@Component({
  selector: "app-ponto-venda",
  templateUrl: "./ponto-venda.component.html",
  styleUrls: ["./ponto-venda.component.css"],
})
export class PontoVendaComponent implements OnInit {
  produtos: ProdutoVenda[] = [];
  produtosExibicao: ProdutoVenda[] = [];
  venda = {
    contato: {} as Contato,
  } as Venda;

  filtro = {
    pagina: 1,
    tamanho: 8,
    total: null,
  } as FiltroSpec;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private modal: NzModalService,
    private vendaService: VendaService
  ) {}

  ngOnInit(): void {}

  contatoSelecionado(contato: Contato) {
    this.venda.contato = contato;
  }

  paginar(pagina = this.filtro.pagina) {
    this.filtro.pagina = pagina;
    this.produtosExibicao = this.produtos.slice(
      (this.filtro.pagina - 1) * this.filtro.tamanho,
      this.filtro.tamanho * this.filtro.pagina
    );
  }

  selecionaProduto(produto?: ProdutoVenda) {
    console.log("teste");
    const selecionaModal = this.modal.create({
      nzTitle: produto ? "Editar Produto" : "Selecionar Produto",
      nzContent: SelecionaProdutoComponent,
      nzComponentParams: { editarProduto: produto },
      nzWidth: "80%",
      nzFooter: [
        {
          label: "Cancelar",
          shape: "round",
          onClick: () => selecionaModal.destroy(),
        },
        {
          label: produto ? "salvar" : "Adicionar",
          type: "primary",
          shape: "round",
          onClick: (modal) => {
            modal.fechar();
          },
        },
      ],
      nzClosable: false,
    });

    selecionaModal.afterClose.subscribe((novoProduto) => {
      if (produto) {
        this.produtos[this.produtos.indexOf(produto)] = novoProduto;
        this.paginar();
      } else if (novoProduto) {
        this.produtos.push(novoProduto);
        this.paginar();
      }
    });
  }

  remover(produto: ProdutoVenda) {
    this.produtos.splice(this.produtos.indexOf(produto), 1);
    this.paginar();
  }

  finalizar() {
    this.venda.produtos = this.produtos;
    this.venda.desconto = 0;
    this.venda.status = "1";
    this.venda.idContato = this.venda.contato.id;

    this.vendaService.finalizar(this.venda).subscribe();
  }
}
