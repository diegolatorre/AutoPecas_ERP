import { Component, OnInit } from '@angular/core';
import Usuario from 'src/app/model/usuario/usuario.model';
import { FiltroSpec } from 'src/app/model/geral/filtro-spec.model';
import { UsuarioService } from 'src/app/service/usuario.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';
import { CadastroUsuarioComponent } from '../cadastro-usuario/cadastro-usuario.component';

@Component({
  selector: 'app-tabela-usuario',
  templateUrl: './tabela-usuario.component.html',
  styleUrls: ['./tabela-usuario.component.css']
})
export class TabelaUsuarioComponent implements OnInit {

  listOfData: Usuario[];
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
    private _service: UsuarioService,
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
        this.filtro.filtros['usuario'] = texto;
      } else {
        delete this.filtro.filtros['nome'];
        delete this.filtro.filtros['usuario'];
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

  cadastrarUsuario(usuario?: Usuario) {
    const cadastroModal = this.modal.create({
      nzTitle: 'Novo Usúario',
      nzContent: CadastroUsuarioComponent,
      nzFooter: [
        {
          label: 'Fechar',
          shape: 'round',
          onClick: () => cadastroModal.destroy()
        },
        {
          label: 'Limpar',
          type: 'danger',
          shape: 'round',
          onClick: modal => { modal.limpar() }
        },
        {
          label: 'Cadastrar',
          type: 'primary',
          shape: 'round',
          onClick: modal => { modal.submitForm() }
        }
      ],
      nzClosable: false
    });
    cadastroModal.afterClose.subscribe(() => this.listar());
  }

  editar(usuario?: Usuario) {
    const cadastroModal = this.modal.create({
      nzTitle: 'Editar Usúario',
      nzContent: CadastroUsuarioComponent,
      nzComponentParams: {
       usuario: usuario
      },
      nzFooter: [
        {
          label: 'Fechar',
          shape: 'round',
          onClick: () => cadastroModal.destroy()
        },
        {
          label: 'Limpar',
          type: 'danger',
          shape: 'round',
          onClick: modal => { modal.limpar() }
        },
        {
          label: 'Salvar',
          type: 'primary',
          shape: 'round',
          onClick: modal => { modal.submitFormEdit() }
        }
      ],
      nzClosable: false
    });
    cadastroModal.afterClose.subscribe(() => this.listar());
  }
}
