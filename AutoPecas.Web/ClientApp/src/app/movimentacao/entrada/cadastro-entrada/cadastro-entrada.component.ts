import { Component, OnInit, Output, EventEmitter, ViewChild, ChangeDetectorRef, Input, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/model/produto/produto.model';
import Entrada from 'src/app/model/notas/entrada.model';
import { Contato } from 'src/app/model/contato/contato.model';
import { ProdutoNota } from 'src/app/model/notas/produto-nota.model';
import { NotaService } from 'src/app/service/nota.service';
import { AutoCompleteProdutoComponent } from 'src/app/shared/auto-complete/auto-complete-produto/auto-complete-produto.component';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { SucessoCadastroComponent } from '../../sucesso-cadastro/sucesso-cadastro.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { AutoCompleteContatoComponent } from 'src/app/shared/auto-complete/auto-complete-contato/auto-complete-contato.component';

@Component({
  selector: 'app-cadastro-entrada',
  templateUrl: './cadastro-entrada.component.html',
  styleUrls: ['./cadastro-entrada.component.css']
})
export class CadastroEntradaComponent implements OnInit, AfterViewInit {
  notaForm = new FormGroup({
    chaveAcesso: new FormControl(null, [Validators.required]),
    fornecedor: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null, [Validators.required]),
  });

  produtoForm = new FormGroup({
    produto: new FormControl(null, [Validators.required]),
    quantidade: new FormControl(null, [Validators.required, Validators.min(1)]),
  });

  entrada = { } as Entrada;
  produtos: Array<ProdutoNota> = [];
  produtosExibicao: Array<ProdutoNota> = [];

  paginacao = {
    pagina: 1,
    tamanho: 3,
    total: null,
  } as FiltroSpec;

  editId: string | null = null;

  @Input() visualizarNota?: Entrada = null;

  @ViewChild('AutoCompleteProduto') autoCompleteProduto: AutoCompleteProdutoComponent;
  @ViewChild('AutoCompleteContatoOrigem') autoCompleteContatoOrigem: AutoCompleteContatoComponent;
  @ViewChild('AutoCompleteContatoDestino') autoCompleteContatoDestino: AutoCompleteContatoComponent;

  constructor(
    private service: NotaService,
    private modalResult: NzModalService,
  ) { }

  ngOnInit(): void {
    if (this.visualizarNota) {
      this.entrada = this.visualizarNota
      this.produtos = this.visualizarNota.produtos;

      this.notaForm.get('chaveAcesso').setValue(this.visualizarNota.chaveAcesso);
      this.notaForm.get('observacao').setValue(this.visualizarNota.observacao);
      this.notaForm.get('chaveAcesso').disable();
      this.notaForm.get('observacao').disable();
      this.paginar();
    }
  }

  ngAfterViewInit() {
    if (this.visualizarNota) {
      this.autoCompleteContatoOrigem.selecionaManualmente(this.visualizarNota.contatoOrigem);
      this.autoCompleteContatoDestino.selecionaManualmente(this.visualizarNota.contatoDestino);
    }
  }

  removerProduto(id: number): void {
    this.produtos = this.produtos.filter(d => d.produto.id !== id);
    this.paginar();
  }

  incluirProduto() {
    this.produtos = [
      ...this.produtos,
      {
        idProduto: this.produtoForm.get('produto').value.id,
        produto: this.produtoForm.get('produto').value,
        quantidade: this.produtoForm.get('quantidade').value
      }
    ];

    this.produtoForm.reset();
    this.autoCompleteProduto.selecionaManualmente(null);
    this.paginar();
  }

  paginar(pagina = this.paginacao.pagina) {
    this.paginacao.pagina = pagina;
    this.produtosExibicao = this.produtos.slice(
      (this.paginacao.pagina - 1) * this.paginacao.tamanho,
      this.paginacao.tamanho * this.paginacao.pagina
    );
  }

  selecionaProduto = (produto: Produto) => this.produtoForm.get('produto').setValue(produto);

  selecionaOrigem = (fornecedor: Contato) => this.notaForm.get('fornecedor').setValue(fornecedor);

  selecionaDestino = (fornecedor: Contato) => this.notaForm.get('fornecedor').setValue(fornecedor);

  submit = () => {
    if (this.produtos.length <= 0) {
      return;
    }
    this.entrada = {
      chaveAcesso: this.notaForm.get('chaveAcesso').value,
      idContatoOrigem: this.notaForm.get('fornecedor').value.id,
      observacao: this.notaForm.get('observacao').value,
      produtos: this.produtos
    };

    this.service.finalizar(this.entrada).subscribe(() => {
      const modalResult = this.modalResult.create({
        nzTitle: null,
        nzContent: SucessoCadastroComponent,
        nzComponentParams: {
          acao: "cadastrado",
        },
        nzWidth: "80%",
        nzFooter: null,
        nzClosable: false,
        nzMaskClosable: false,
      });

      modalResult.afterClose.subscribe(next => {
        this.notaForm.reset();
        this.produtos = [];
        this.entrada = { };
        this.autoCompleteContatoOrigem.selecionaManualmente();
        this.paginar();
      });
    });
  }
}
