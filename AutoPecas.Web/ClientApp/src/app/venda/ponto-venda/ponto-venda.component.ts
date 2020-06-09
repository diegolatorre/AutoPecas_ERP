import { Component, OnInit, ViewChild, Input, AfterViewInit, ChangeDetectorRef } from "@angular/core";
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
import { AutoCompleteContatoComponent } from "src/app/shared/auto-complete/auto-complete-contato/auto-complete-contato.component";
import { ContatoService } from "src/app/service/contato.service";
import { ActivatedRoute } from "@angular/router";
import { SucessoCadastroComponent } from "../sucesso-cadastro/sucesso-cadastro.component";

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

  idVenda: number;
  venda = {
    status: this.statusVendaEnum.Aberta
   } as Venda;

  paginacao = {
    pagina: 1,
    tamanho: 4,
    total: null,
  } as FiltroSpec;

  @ViewChild('AutoCompleteContato') autoCompleteContato: AutoCompleteContatoComponent;

  constructor(
    private modal: NzModalService,
    private vendaService: VendaService,
    private contatoService: ContatoService,
    private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.idVenda = Number(this.route.snapshot.paramMap.get('id'));
    if (this.idVenda) {
      this.carregaVenda();
    }
  }

  contatoSelecionado(contato: Contato) {
    this.venda.contato = contato;
    this.vendaForm.get('idContato').setValue(contato ? contato.id : null);
  }

  carregaVenda() {
    this.vendaService.obter(this.idVenda).subscribe(data => {
      this.venda = data;
      this.produtos = data.produtos;
      this.paginar();
      this.autoCompleteContato.selecionaManualmente(data.contato);
    });
  }

  novaVenda() {
    this.venda = {
      status: this.statusVendaEnum.Aberta
    } as Venda;

    this.produtos = [];
    this.produtosExibicao = [];
    this.paginacao = {
      pagina: 1,
      tamanho: 4,
      total: null,
    } as FiltroSpec;

    this.autoCompleteContato.selecionaManualmente();

    this.changeDetectorRef.markForCheck();
  }

  paginar(pagina = this.paginacao.pagina) {
    this.paginacao.pagina = pagina;
    this.produtosExibicao = this.produtos.slice(
      (this.paginacao.pagina - 1) * this.paginacao.tamanho,
      this.paginacao.tamanho * this.paginacao.pagina
    );
  }

  selecionaProduto(produto?: ProdutoVenda) {
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
       editarContato: contato,
       venda: true
      },
      nzWidth: "80%",
      nzFooter: null,
      nzClosable: false
    });

    cadastroModal.afterClose.subscribe(data => {
      this.contatoService.obter(data).subscribe(next => this.autoCompleteContato.selecionaManualmente(next));
    });
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

    if (this.venda.id == null) {
      this.vendaService.criar(this.venda).subscribe(() => {
        const modalResult = this.modal.create({
          nzTitle: null,
          nzContent: SucessoCadastroComponent,
          nzComponentParams: {
            acao: this.statusVendaLabel.get(this.venda.status)
          },
          nzWidth: "80%",
          nzFooter: null,
          nzClosable: false,
          nzMaskClosable: false
        });

        modalResult.afterClose.subscribe(next => { this.novaVenda() });
      });
    } else {
      this.vendaService.editar(this.venda).subscribe(() => {
        const modalResult = this.modal.create({
          nzTitle: null,
          nzContent: SucessoCadastroComponent,
          nzComponentParams: {
            acao: this.statusVendaLabel.get(this.venda.status)
          },
          nzWidth: "80%",
          nzFooter: null,
          nzClosable: false,
          nzMaskClosable: false
        });

        modalResult.afterClose.subscribe(next => { this.novaVenda() });
      });
    }
  }
}
