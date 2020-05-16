import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Marca } from 'src/app/model/marca.model';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { MarcaService } from 'src/app/service/marca.service';

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
    private marcaService: MarcaService
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
        this.marcaService.busca(texto).subscribe(next => {
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
