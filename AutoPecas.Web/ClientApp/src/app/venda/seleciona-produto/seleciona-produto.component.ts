import { Component, OnInit } from '@angular/core';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { Produto } from 'src/app/model/produto/produto.model';
import { Marca } from 'src/app/model/produto/marca.model';
import { Categoria } from 'src/app/model/produto/categoria.model';

@Component({
  selector: 'app-seleciona-produto',
  templateUrl: './seleciona-produto.component.html',
  styleUrls: ['./seleciona-produto.component.css']
})
export class SelecionaProdutoComponent implements OnInit {
  produto = {
    marca: { } as Marca,
    categoria: { } as Categoria
  } as Produto;
  constructor(private modal: NzModalRef) { }

  ngOnInit(): void {
  }

  fechar(): void {
    this.modal.destroy(this.produto.id ? this.produto : null);
  }

  selecionaProduto(produto: Produto) {
    console.log(produto);
    this.produto = produto;
  }
}
