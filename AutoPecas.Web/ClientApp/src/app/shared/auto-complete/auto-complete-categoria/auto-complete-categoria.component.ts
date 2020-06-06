import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Categoria } from 'src/app/model/produto/categoria.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { CategoriaService } from 'src/app/service/categoria.service';

@Component({
  selector: 'app-auto-complete-categoria',
  templateUrl: './auto-complete-categoria.component.html',
  styleUrls: ['./auto-complete-categoria.component.css']
})
export class AutoCompleteCategoriaComponent implements OnInit {
  ctrlBusca = new FormControl(null);
  categoriaSelecionada: Categoria = null;
  isLoading = false;
  data = [];

  categorias: Subject<string> = new Subject<string>();
  categoriasList$ = this.categorias.asObservable();

  @Output()
  readonly quandoSelecionado = new EventEmitter<Categoria>();

  constructor(
    private categoriaService: CategoriaService
  ) { }

  ngOnInit(): void {
    this.categoriasList$
    .pipe(
      debounceTime(800),
      distinctUntilChanged(),
      filter(
        (texto) => typeof texto === 'string' && !!texto && texto.length >= 1
      ),
      tap(() => this.isLoading = true)
    )
    .subscribe(texto => {
      this.categoriaService.busca(texto).subscribe(next => {
        this.data = next;
        this.isLoading = false;
      });
    });
  }

  seleciona(categoria: Categoria) {
    this.categoriaSelecionada = categoria;
    this.quandoSelecionado.emit(this.categoriaSelecionada);
  }

  selecionaManualmente(categoria: Categoria) {
    this.data = [];
    this.data.push(categoria);
    this.categoriaSelecionada = categoria;
    this.quandoSelecionado.emit(this.categoriaSelecionada);
  }

}
