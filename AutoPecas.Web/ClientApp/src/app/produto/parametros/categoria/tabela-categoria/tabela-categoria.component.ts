import { Component, OnInit } from '@angular/core';
import { CategoriaService } from 'src/app/service/categoria.service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { Categoria } from 'src/app/model/produto/categoria.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CadastroCategoriaComponent } from '../cadastro-categoria/cadastro-categoria.component';

@Component({
  selector: 'app-tabela-categoria',
  templateUrl: './tabela-categoria.component.html',
  styleUrls: ['./tabela-categoria.component.css']
})
export class TabelaCategoriaComponent implements OnInit {

  listOfData: Categoria[];
  value?: string;
  filtro = {
    pagina: 1,
    tamanho: 5,
    total: null,
    filtros: {},
  } as FiltroSpec;

  busca: Subject<string> = new Subject<string>();
  busca$ = this.busca.asObservable();

  contentSearch: string;

  constructor(
    private _service: CategoriaService,
    private modal: NzModalService
    ) { }

  ngOnInit(): void {
    this.listar();
    this.busca$
    .pipe(
      debounceTime(800),
      distinctUntilChanged()
    )
    .subscribe(texto => {
      if (texto) {
        this.filtro.filtros['nome'] = texto;
        this.filtro.filtros['descricao'] = texto;
      } else {
        delete this.filtro.filtros['nome'];
        delete this.filtro.filtros['descricao'];
      }
      this.listar();
    });
  }

  paginar(pagina: number) {
    this.filtro.pagina = pagina;
    this.listar();
  }

  listar() {
    this._service.listar(this.filtro).subscribe(next => {
      this.filtro.total = next.total;
      this.listOfData = next.lista;
    });
  }

  cadastrarCategoria() {
    const cadastroModal = this.modal.create({
      nzContent: CadastroCategoriaComponent,
      nzTitle: 'Nova Categoria',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
    cadastroModal.afterClose.subscribe(() => this.listar());
  }

  editar(categoria?: Categoria) {
    const cadastroModal = this.modal.create({
      nzContent: CadastroCategoriaComponent,
      nzComponentParams: {
        categoria: categoria
      },
      nzTitle: 'Editar Categoria',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
    cadastroModal.afterClose.subscribe(() => this.listar());
  }
}
