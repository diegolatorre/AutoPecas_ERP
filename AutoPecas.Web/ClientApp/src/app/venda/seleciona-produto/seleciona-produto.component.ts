import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Produto } from 'src/app/model/produto/produto.model';
import { Marca } from 'src/app/model/produto/marca.model';
import { Categoria } from 'src/app/model/produto/categoria.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProdutoVenda } from 'src/app/model/venda/produto-venda.model';

@Component({
  selector: 'app-seleciona-produto',
  templateUrl: './seleciona-produto.component.html',
  styleUrls: ['./seleciona-produto.component.css']
})
export class SelecionaProdutoComponent implements OnInit {
  produtoVendaForm = new FormGroup(
    {
      quantidade: new FormControl(1, [Validators.required]),
      desconto: new FormControl(0.00, [Validators.required]),
    });

  produto: Produto;
  produtoVenda: ProdutoVenda;

  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  fechar(): void {
    this.produtoVenda = {
      quantidade: this.produtoVendaForm.get('quantidade').value,
      desconto: this.produtoVendaForm.get('desconto').value,
      valorFinal: this.produto.valorVenda * this.produtoVendaForm.get('quantidade').value,
      produto: this.produto
    } as ProdutoVenda;

    this.modal.destroy(this.produto.id ? this.produtoVenda : null);
  }

  selecionaProduto(produto: Produto) {
    console.log(produto);
    this.produto = produto;
  }
}
