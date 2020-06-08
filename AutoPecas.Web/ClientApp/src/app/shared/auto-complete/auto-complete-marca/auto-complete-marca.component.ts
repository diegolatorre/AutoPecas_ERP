import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Marca } from 'src/app/model/produto/marca.model';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { MarcaService } from 'src/app/service/marca.service';
import { Observable, of, from, Subject } from 'rxjs';

@Component({
  selector: 'app-auto-complete-marca',
  templateUrl: './auto-complete-marca.component.html',
  styleUrls: ['./auto-complete-marca.component.css']
})
export class AutoCompleteMarcaComponent implements OnInit {
  marcaSelecionada: Marca = null;
  isLoading = false;
  data = [];

  marcas: Subject<string> = new Subject<string>();
  marcasList$ = this.marcas.asObservable();

  @Output()
  readonly quandoSelecionado = new EventEmitter<Marca>();

  constructor(
    private marcaService: MarcaService
  ) { }

  ngOnInit(): void {
    this.marcasList$
    .pipe(
      debounceTime(800),
      distinctUntilChanged(),
      filter(
        (texto) => typeof texto === 'string' && !!texto && texto.length >= 1
      ),
      tap(() => this.isLoading = true)
    )
    .subscribe(texto => {
      this.marcaService.busca(texto).subscribe(next => {
        this.data = next;
        this.isLoading = false;
      });
    });
  }

  seleciona(marca: Marca) {
    this.marcaSelecionada = marca;
    this.quandoSelecionado.emit(this.marcaSelecionada);
  }

  selecionaManualmente(marca: Marca) {
    this.data = [];
    this.data.push(marca);
    this.marcaSelecionada = marca;
    this.quandoSelecionado.emit(this.marcaSelecionada);
  }
}
