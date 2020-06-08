import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Contato } from 'src/app/model/contato/contato.model';
import { Subject } from 'rxjs';
import { ContatoService } from 'src/app/service/contato.service';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-auto-complete-contato',
  templateUrl: './auto-complete-contato.component.html',
  styleUrls: ['./auto-complete-contato.component.css']
})
export class AutoCompleteContatoComponent implements OnInit {
  ctrlBusca = new FormControl(null);
  contatoSelecionado: Contato = null;
  isLoading = false;
  data = [];

  contatos: Subject<string> = new Subject<string>();
  contatosList$ = this.contatos.asObservable();

  @Output()
  readonly quandoSelecionado = new EventEmitter<Contato>();

  @Input() disabled = false;

  constructor(
    private contatoService: ContatoService,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.contatosList$
    .pipe(
      debounceTime(800),
      distinctUntilChanged(),
      filter(
        (texto) => typeof texto === 'string' && !!texto && texto.length >= 1
      ),
      tap(() => this.isLoading = true)
    )
    .subscribe(texto => {
      this.contatoService.busca(texto).subscribe(next => {
        this.data = next;
        this.isLoading = false;
      });
    });
  }

  seleciona(contato: Contato) {
    this.contatoSelecionado = contato;
    this.quandoSelecionado.emit(this.contatoSelecionado);
  }

  selecionaManualmente(contato: Contato = null) {
    this.data = [];
    contato ? this.data.push(contato) : null;
    this.contatoSelecionado = contato;
    this.quandoSelecionado.emit(this.contatoSelecionado);
    this.changeDetectorRef.markForCheck();
  }
}
