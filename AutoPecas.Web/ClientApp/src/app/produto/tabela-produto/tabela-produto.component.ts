import { Component, OnInit } from '@angular/core';
import { Produto } from 'src/app/model/produto.model';
import { ProdutoService } from 'src/app/service';

@Component({
  selector: 'app-tabela-produto',
  templateUrl: './tabela-produto.component.html',
  styleUrls: ['./tabela-produto.component.css']
})
export class TabelaProdutoComponent implements OnInit {
  produtos: Produto[];
  produtoDetalhes: Produto = { marca: { }, categoria: { } } as Produto;
  visible = false;

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.produtoService.listar().subscribe(next => {
      console.log(next);
      this.produtos = next;
    });
  }

  detalhes(produto?: Produto) {
    produto ? this.produtoDetalhes = produto : null;
    this.visible = !this.visible;
  }

  filtrar() {
    let t = this.produtos[0]
    this.produtos = [];
    this.produtos.push(t);
  }
}
