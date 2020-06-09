import { Component, OnInit } from '@angular/core';
import { MarcaService } from 'src/app/service/marca.service';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { Marca } from 'src/app/model/produto/marca.model';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CadastroMarcaComponent } from '../cadastro-marca/cadastro-marca.component';

@Component({
  selector: 'app-tabela-marca',
  templateUrl: './tabela-marca.component.html',
  styleUrls: ['./tabela-marca.component.css']
})
export class TabelaMarcaComponent implements OnInit {

  listOfData: Marca[];
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
    private _service: MarcaService,
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
      console.log(this.listOfData);
    });
  }

  cadastrarMarca() {
    const cadastroModal = this.modal.create({
      nzContent: CadastroMarcaComponent,
      nzTitle: 'Nova Marca',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
    cadastroModal.afterClose.subscribe(() => this.listar());
  }

  editar(marca?: Marca) {
    const cadastroModal = this.modal.create({
      nzContent: CadastroMarcaComponent,
      nzComponentParams: {
       marca: marca
      },
      nzTitle: 'Editar Marca',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
    cadastroModal.afterClose.subscribe(() => this.listar());
  }
}

