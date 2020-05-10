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
    valorVenda: new FormControl(null, [Validators.required])
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
      valorCusto: 0,
      valorVenda: this.produtoForm.get('valorVenda').value,
      lucro: 0,
      estoqueMinimo: 0,
      estoqueMaximo: 0,
      observacao: 'Teste de cadastro de produtos'
    } as Produto;

    this.produtoService.incluir(this.produto).subscribe(next => console.log('Produto Cadastrado'));
  }

}
