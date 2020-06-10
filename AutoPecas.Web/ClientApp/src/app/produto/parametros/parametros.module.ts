import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeiraRoutingModule, EntryComponents, RoutedComponents } from './parametros-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { TabelaCategoriaComponent } from './categoria/tabela-categoria/tabela-categoria.component';
import { CadastroCategoriaComponent } from './categoria/cadastro-categoria/cadastro-categoria.component';
import { TabelaMarcaComponent } from './marca/tabela-marca/tabela-marca.component';
import { CadastroMarcaComponent } from './marca/cadastro-marca/cadastro-marca.component';
import { SucessoCadastroComponent } from './categoria/sucesso-cadastro/sucesso-cadastro.component';
import { SucessoCadastroComponent as SucessoCadastroComponentMarca } from './marca/sucesso-cadastro/sucesso-cadastro.component';

@NgModule({
  declarations: [RoutedComponents, CadastroCategoriaComponent, TabelaCategoriaComponent, TabelaMarcaComponent, CadastroMarcaComponent, SucessoCadastroComponent, SucessoCadastroComponentMarca],
  entryComponents: [EntryComponents],
  imports: [
    CadeiraRoutingModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParametrosModule { }
