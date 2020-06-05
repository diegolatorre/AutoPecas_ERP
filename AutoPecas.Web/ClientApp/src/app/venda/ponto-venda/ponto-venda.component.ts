import { Component, OnInit } from "@angular/core";
import { FiltroSpec } from "src/app/model/geral/filtro-spec.model";
import { Contato } from "src/app/model/contato/contato.model";
import { Venda } from "src/app/model/venda/venda.model.model";
import { NzModalService } from "ng-zorro-antd/modal";
import { SelecionaProdutoComponent } from "../seleciona-produto/seleciona-produto.component";
import { ProdutoVenda } from "src/app/model/venda/produto-venda.model";
import { VendaService } from "src/app/service/venda.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { StatusVendaEnum, StatusVendaLabel } from "src/app/model/enum/statusVenda.enum";
import { CadastroContatoComponent } from "src/app/contato/cadastro-contato/cadastro-contato.component";

@Component({
  selector: "app-ponto-venda",
  templateUrl: "./ponto-venda.component.html",
  styleUrls: ["./ponto-venda.component.css"],
})
export class PontoVendaComponent implements OnInit {
  vendaForm = new FormGroup(
    {
      desconto: new FormControl(0.00, [Validators.required]),
      idContato: new FormControl(null, [Validators.required])
    });

  produtos: ProdutoVenda[] = [];
  produtosExibicao: ProdutoVenda[] = [];

  statusVendaEnum = StatusVendaEnum;
  statusVendaLabel = StatusVendaLabel;

  venda = {
    contato: {} as Contato,
  } as Venda;

  statusVenda

  paginacao = {
    pagina: 1,
    tamanho: 8,
    total: null,
  } as FiltroSpec;

  constructor(
    private modal: NzModalService,
    private vendaService: VendaService
  ) {}

  ngOnInit(): void {}

  contatoSelecionado(contato: Contato) {
    this.venda.contato = contato;
    this.vendaForm.get('idContato').setValue(contato.id);
  }

  paginar(pagina = this.paginacao.pagina) {
    this.paginacao.pagina = pagina;
    this.produtosExibicao = this.produtos.slice(
      (this.paginacao.pagina - 1) * this.paginacao.tamanho,
      this.paginacao.tamanho * this.paginacao.pagina
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

  cadastrarContato(contato?: Contato) {
    const cadastroModal = this.modal.create({
      nzTitle: 'Novo Contato',
      nzContent: CadastroContatoComponent,
      nzComponentParams: {
       editarContato: contato
      },
      nzFooter: [
        {
          label: 'Fechar',
          shape: 'round',
          onClick: () => cadastroModal.destroy()
        },
        {
          label: 'Limpar',
          type: 'danger',
          shape: 'round',
          onClick: modal => { modal.limpar() }
        },
        {
          label: 'Cadastrar',
          type: 'primary',
          shape: 'round',
          onClick: modal => { modal.cadastrar() }
        }
      ],
      nzClosable: false
    });

    cadastroModal.afterClose.subscribe(data => console.log(data));
  }

  remover(produto: ProdutoVenda) {
    this.produtos.splice(this.produtos.indexOf(produto), 1);
    this.paginar();
  }

  finalizar(status: StatusVendaEnum) {
    this.venda.produtos = this.produtos;
    this.venda.desconto = Number(this.vendaForm.get('desconto').value);
    this.venda.idContato = this.venda.contato.id;
    this.venda.status = status;

    this.vendaService.finalizar(this.venda).subscribe();
  }
}
