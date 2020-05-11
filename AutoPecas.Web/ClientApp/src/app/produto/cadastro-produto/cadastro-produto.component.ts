import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from 'src/app/service';

@Component({
  selector: 'app-cadastro-produto',
  templateUrl: './cadastro-produto.component.html',
  styleUrls: ['./cadastro-produto.component.css']
})
export class CadastroProdutoComponent implements OnInit {
  produtoForm = new FormGroup({
    descricao: new FormControl(null, [Validators.required]),
    codigoBarras: new FormControl(null, [Validators.required]),
    valorCusto: new FormControl(null, [Validators.required]),
    valorVenda: new FormControl(0, [Validators.required]),
    checkLucro: new FormControl(false),
    lucro: new FormControl(null),
    estoqueMinimo: new FormControl(null, [Validators.required]),
    estoqueMaximo: new FormControl(null, [Validators.required]),
    observacao: new FormControl(null, Validators.required)
  });

  produto: Produto;

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
  }

  cadastrar() {
    this.produto = {
      descricao: this.produtoForm.get('descricao').value,
      codigoBarras: this.produtoForm.get('codigoBarras').value,
      idCategoria: 1,
      idMarca: 1,
      valorCusto: this.produtoForm.get('valorCusto').value,
      valorVenda: this.produtoForm.get('valorVenda').value,
      lucro: this.produtoForm.get('lucro').value,
      estoqueMinimo: this.produtoForm.get('estoqueMinimo').value,
      estoqueMaximo: this.produtoForm.get('estoqueMaximo').value,
      observacao: this.produtoForm.get('observacao').value
    } as Produto;

    this.produtoService.incluir(this.produto).subscribe(next => console.log('Produto Cadastrado'));
  }

}
