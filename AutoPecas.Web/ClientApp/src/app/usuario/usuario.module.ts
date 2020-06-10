import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module'
import { UsuarioRoutingModule } from './usuario-routing.module';
import { CadastroUsuarioComponent } from './cadastro-usuario/cadastro-usuario.component';
import { TabelaUsuarioComponent } from './tabela-usuario/tabela-usuario.component';
import { SucessoCadastroComponent } from './sucesso-cadastro/sucesso-cadastro.component';


@NgModule({
  declarations: [CadastroUsuarioComponent, TabelaUsuarioComponent, SucessoCadastroComponent],
  imports: [
    CommonModule,
    UsuarioRoutingModule,
    SharedModule
  ]
})
export class UsuarioModule { }
