import { Component } from '@angular/core';
import { CadastroContatoComponent } from '../contato/cadastro-contato/cadastro-contato.component';
import { NzModalService } from 'ng-zorro-antd/modal';
import { CadastroMarcaComponent } from '../produto/parametros/marca/cadastro-marca/cadastro-marca.component';
import { CadastroCategoriaComponent } from '../produto/parametros/categoria/cadastro-categoria/cadastro-categoria.component';
import { CadastroProdutoComponent } from '../produto/cadastro-produto/cadastro-produto.component';
import { CadastroUsuarioComponent } from '../usuario/cadastro-usuario/cadastro-usuario.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private modal: NzModalService
  ) { }

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
    // const cadastroModal = this.modal.create({
    //   nzTitle: 'Novo Usúario',
    //   nzContent: CadastroUsuarioComponent,
    //   nzFooter: [
    //     {
    //       label: 'Fechar',
    //       shape: 'round',
    //       onClick: () => cadastroModal.destroy()
    //     },
    //     {
    //       label: 'Limpar',
    //       type: 'danger',
    //       shape: 'round',
    //       onClick: modal => { modal.limpar() }
    //     },
    //     {
    //       label: 'Cadastrar',
    //       type: 'primary',
    //       shape: 'round',
    //       onClick: modal => { modal.submitForm() }
    //     }
    //   ],
    //   nzClosable: false
    // });
  }

  cadastrarMarca() {
    const cadastroModal = this.modal.create({
      nzTitle: 'Nova Marca',
      nzContent: CadastroMarcaComponent,
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
  }

  cadastrarCategoria() {
    const cadastroModal = this.modal.create({
      nzTitle: 'Nova Categoria',
      nzContent: CadastroCategoriaComponent,
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
