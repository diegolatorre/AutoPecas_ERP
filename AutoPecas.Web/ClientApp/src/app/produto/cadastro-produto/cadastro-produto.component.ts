import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Produto } from "src/app/model/produto/produto.model";
import { ProdutoService } from "src/app/service";
import { Marca } from "src/app/model/produto/marca.model";
import { Categoria } from "src/app/model/produto/categoria.model";

@Component({
  selector: "app-cadastro-produto",
  templateUrl: "./cadastro-produto.component.html",
  styleUrls: ["./cadastro-produto.component.css"],
})
export class CadastroProdutoComponent implements OnInit {
  produtoForm = new FormGroup({
    descricao: new FormControl(null, [Validators.required]),
    codigoBarras: new FormControl(null, [Validators.required]),
    valorCusto: new FormControl(null, [Validators.required]),
    valorVenda: new FormControl({ value: null, disabled: false }, [
      Validators.required,
    ]),
    checkLucro: new FormControl(false),
    lucro: new FormControl({ value: null, disabled: true }),
    estoqueMinimo: new FormControl(null, [Validators.required]),
    estoqueMaximo: new FormControl(null, [Validators.required]),
    marca: new FormControl(null, [Validators.required]),
    categoria: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null, Validators.required),
  });

  produto: Produto;

  @Input() editarProduto?: Produto;

  constructor(private produtoService: ProdutoService) {}

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

  limpar() {
    this.produtoForm.reset();
  }

  cadastrar() {
    this.produto = {
      id: this.editarProduto ? this.editarProduto.id : null,
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
        .subscribe(() => console.log("Produto Editado"));
    } else {
      this.produtoService
      .incluir(this.produto)
      .subscribe(() => console.log("Produto Cadastrado"));
    }
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
}
