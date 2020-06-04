import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Produto } from 'src/app/model/produto/produto.model';
import { Subject } from 'rxjs';
import { ProdutoService } from 'src/app/service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { Marca } from 'src/app/model/produto/marca.model';

@Component({
  selector: 'app-auto-complete-produto',
  templateUrl: './auto-complete-produto.component.html',
  styleUrls: ['./auto-complete-produto.component.css']
})
export class AutoCompleteProdutoComponent implements OnInit {
  produtoSelecionado: Produto = null;
  isLoading = false;
  data = [];

  produtos: Subject<string> = new Subject<string>();
  produtosList$ = this.produtos.asObservable();

  @Output()
  readonly quandoSelecionado = new EventEmitter<Produto>();

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.produtosList$
    .pipe(
      debounceTime(800),
      distinctUntilChanged(),
      filter(
        (texto) => typeof texto === 'string' && !!texto && texto.length >= 1
      ),
      tap(() => this.isLoading = true)
    )
    .subscribe(texto => {
      this.produtoService.busca(texto).subscribe(next => {
        this.data = next;
        this.isLoading = false;
      });
    });
  }

  seleciona(produto: Produto) {
    this.produtoSelecionado = produto;
    this.quandoSelecionado.emit(this.produtoSelecionado);
  }

}