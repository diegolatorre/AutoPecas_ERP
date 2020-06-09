import { Component, OnInit, Input, ViewChild, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Produto } from "src/app/model/produto/produto.model";
import { ProdutoService } from "src/app/service";
import { Marca } from "src/app/model/produto/marca.model";
import { Categoria } from "src/app/model/produto/categoria.model";
import { Router } from "@angular/router";
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { AutoCompleteCategoriaComponent } from "src/app/shared/auto-complete/auto-complete-categoria/auto-complete-categoria.component";
import { AutoCompleteMarcaComponent } from "src/app/shared/auto-complete/auto-complete-marca/auto-complete-marca.component";
import { SucessoCadastroComponent } from "../sucesso-cadastro/sucesso-cadastro.component";

@Component({
  selector: "app-cadastro-produto",
  templateUrl: "./cadastro-produto.component.html",
  styleUrls: ["./cadastro-produto.component.css"],
})
export class CadastroProdutoComponent implements OnInit, AfterViewInit {
  produtoForm = new FormGroup({
    descricao: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    codigoBarras: new FormControl(null, [Validators.required, Validators.minLength(13)]),
    valorCusto: new FormControl(null, [Validators.required]),
    valorVenda: new FormControl({ value: null, disabled: false }, [
      Validators.required,
    ]),
    checkLucro: new FormControl(false),
    lucro: new FormControl({ value: null, disabled: true }),
    estoqueMinimo: new FormControl(0, [Validators.required]),
    estoqueMaximo: new FormControl(0, [Validators.required]),
    marca: new FormControl(null, [Validators.required]),
    categoria: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null),
  });

  produto: Produto;

  exibirErro = false;

  @Input() editarProduto?: Produto;

  @ViewChild('AutoCompleteCategoria') autoCompleteCategoria: AutoCompleteCategoriaComponent;
  @ViewChild('AutoCompleteMarca') autoCompleteMarca: AutoCompleteMarcaComponent;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private modal: NzModalRef,
    private modalResult: NzModalService,
  ) {}

  ngOnInit(): void {
    if (this.editarProduto) {
      this.produtoForm.patchValue({
        descricao: this.editarProduto.descricao,
        codigoBarras: this.editarProduto.codigoBarras,
        valorCusto: this.editarProduto.valorCusto,
        valorVenda: this.editarProduto.valorVenda,
        lucro: this.editarProduto.lucro,
        estoqueMinimo: this.editarProduto.estoqueMinimo,
        estoqueMaximo: this.editarProduto.estoqueMaximo,
        observacao: this.editarProduto.observacao,
      });
    }
  }

  ngAfterViewInit() {
    if (this.editarProduto) {
      this.autoCompleteCategoria.selecionaManualmente(this.editarProduto.categoria);
      this.autoCompleteMarca.selecionaManualmente(this.editarProduto.marca);
    }
  }

  limpar() {
    this.produtoForm.reset();
  }

  alteraLucro(valor: boolean) {
    if (valor) {
      this.produtoForm.get("lucro").enable();
      this.produtoForm.get("valorVenda").disable();
    } else {
      this.produtoForm.get("lucro").disable();
      this.produtoForm.get("valorVenda").enable();
    }
  }

  marcaSelecionada(marca: Marca) {
    this.produtoForm.get("marca").setValue(marca);
  }

  categoriaSelecionada(categoria: Categoria) {
    this.produtoForm.get("categoria").setValue(categoria);
  }

  fechar() {
    this.modal.destroy();
  }

  cadastrar() {
    this.produto = {
      id: this.editarProduto ? this.editarProduto.id : 0,
      descricao: this.produtoForm.get("descricao").value,
      codigoBarras: this.produtoForm.get("codigoBarras").value,
      idCategoria: this.produtoForm.get("categoria").value.id,
      idMarca: this.produtoForm.get("marca").value.id,
      valorCusto: this.produtoForm.get("valorCusto").value,
      valorVenda: this.produtoForm.get("valorVenda").value,
      lucro: this.produtoForm.get("lucro").value,
      estoqueMinimo: this.produtoForm.get("estoqueMinimo").value,
      estoqueMaximo: this.produtoForm.get("estoqueMaximo").value,
      observacao: this.produtoForm.get("observacao").value,
    } as Produto;

    if (this.editarProduto) {
      this.produtoService
        .editar(this.produto)
        .subscribe(() => {
          const modalResult = this.modalResult.create({
            nzTitle: null,
            nzContent: SucessoCadastroComponent,
            nzComponentParams: {
              acao: 'editado'
            },
            nzWidth: "80%",
            nzFooter: null,
            nzClosable: false,
            nzMaskClosable: false
          });

          modalResult.afterClose.subscribe(next => { this.fechar(); });
        });
    } else {
      this.produtoService
      .incluir(this.produto)
      .subscribe(() => {
        const modalResult = this.modalResult.create({
          nzTitle: null,
          nzContent: SucessoCadastroComponent,
          nzComponentParams: {
            acao: 'cadastrado'
          },
          nzWidth: "80%",
          nzFooter: null,
          nzClosable: false,
          nzMaskClosable: false
        });

        modalResult.afterClose.subscribe(next => { this.fechar(); });
      });
    }
  }
}
