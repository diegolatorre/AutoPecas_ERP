import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../service';
import { Produto } from '../model/produto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  produtos: Produto[];

  public constructor (
    private produtoService: ProdutoService
  ) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.produtoService.listar().subscribe(next => {
      console.log(next);
      this.produtos = next;
    });
  }
}
