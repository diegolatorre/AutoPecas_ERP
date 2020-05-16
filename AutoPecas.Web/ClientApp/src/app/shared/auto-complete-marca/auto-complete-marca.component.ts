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
  isLoading = false;
  Opcoes$: Observable<Marca[]>;
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
      tap(() => this.isLoading = true)
    )
    .subscribe((texto) => {
      this.produtoService.busca(texto).subscribe(next => {
        this.data = next;
        this.isLoading = false;
      });
    });
  }

  teste(event: any) {
    this.ctrlBusca.setValue(event.nzValue);
    this.quandoSelecionado.emit(this.ctrlBusca.value);
  }
}
