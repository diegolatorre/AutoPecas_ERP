import { Component } from '@angular/core';
import { CadastroContatoComponent } from '../contato/cadastro-contato/cadastro-contato.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CadastroMarcaComponent } from '../produto/parametros/marca/cadastro-marca/cadastro-marca.component';
import { CadastroCategoriaComponent } from '../produto/parametros/categoria/cadastro-categoria/cadastro-categoria.component';
import { CadastroProdutoComponent } from '../produto/cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from '../usuario/cadastro-usuario/cadastro-usuario.component';
import { getPerfil, clear } from '../shared/sessao';
import Usuario from '../model/usuario/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  perfilSessao: Usuario = getPerfil();

  constructor(
    private modal: NzModalService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!getPerfil())
      this.router.navigateByUrl('/');
  }

  cadastrarContato() {
    const cadastroModal = this.modal.create({
      nzTitle: 'Novo Contato',
      nzContent: CadastroContatoComponent,
      nzWidth: '80%',
      nzFooter: null,
      nzClosable: false
    });
  }

  cadastrarUsuario() {
    const cadastroModal = this.modal.create({
      nzContent: CadastroUsuarioComponent,
      nzTitle: 'Novo Usúario',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
  }

  meuPerfil() {
    const cadastroModal = this.modal.create({
      nzContent: CadastroUsuarioComponent,
      nzComponentParams: {
       usuario: getPerfil()
      },
      nzTitle: 'Editar Usúario',
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
  }

  sair() {
    clear();
    location.reload();
  }

  cadastrarMarca() {
    const cadastroModal = this.modal.create({
      nzTitle: 'Nova Marca',
      nzContent: CadastroMarcaComponent,
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
  }

  cadastrarCategoria() {
    const cadastroModal = this.modal.create({
      nzTitle: 'Nova Categoria',
      nzContent: CadastroCategoriaComponent,
      nzWidth: '40%',
      nzFooter: null,
      nzClosable: false
    });
  }

  cadastrarProduto() {
    const cadastroModal = this.modal.create({
      nzTitle: 'Novo Produto',
      nzContent: CadastroProdutoComponent,
      nzWidth: '80%',
      nzFooter: null,
      nzClosable: false
    });
  }
}
