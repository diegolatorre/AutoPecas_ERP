import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ProdutoService } from 'src/app/service';
import { Marca } from 'src/app/model/marca.model';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-marca',
  templateUrl: './auto-complete-marca.component.html',
  styleUrls: ['./auto-complete-marca.component.css']
})
export class AutoCompleteMarcaComponent implements OnInit {
  ctrlBusca = new FormControl(null);
  marcaSelecionada: Marca = null;
  isLoading = false;
  nadaEncontrado = false;
  data = [];

  @Output()
  readonly quandoSelecionado = new EventEmitter<Marca>();

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.ctrlBusca.valueChanges
    .pipe(
      debounceTime(800),
      distinctUntilChanged(),
      filter(
        (texto) => typeof texto === 'string' && !!texto && texto.length >= 3
      ),
      tap(() => this.isLoading = true)
    )
    .subscribe(texto => {
      if (texto) {
        this.produtoService.busca(texto).subscribe(next => {
          console.log(next);
          this.data = next;
          this.isLoading = false;
          if (next) {
            this.nadaEncontrado = true;
          }
        });
      }
    });
  }

  seleciona(event: any) {
    this.marcaSelecionada = event.nzValue;
    this.ctrlBusca.setValue(this.marcaSelecionada);
    this.quandoSelecionado.emit(this.marcaSelecionada);
  }

  verificaSelecionado() {
    if (
      !this.marcaSelecionada ||
      this.marcaSelecionada !== this.ctrlBusca.value
    ) {
      if (this.marcaSelecionada) {
        this.ctrlBusca.setValue(this.marcaSelecionada);
      } else {
        this.ctrlBusca.setValue(null);
        this.marcaSelecionada = null;
      }
    }
  }
}
