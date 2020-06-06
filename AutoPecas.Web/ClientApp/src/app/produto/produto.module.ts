import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoRoutingModule, EntryComponents, RoutedComponents } from './produto-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { ParametrosModule } from './parametros/parametros.module';
import { FiltroProdutoComponent } from './filtro-produto/filtro-produto.component';
import { SucessoCadastroComponent } from './sucesso-cadastro/sucesso-cadastro.component';

@NgModule({
  declarations: [RoutedComponents, CadastroProdutoComponent, TabelaProdutoComponent, FiltroProdutoComponent, SucessoCadastroComponent],
  entryComponents: [EntryComponents],
  imports: [
    ProdutoRoutingModule,
    SharedModule,
    NzButtonModule,
    ReactiveFormsModule,
    ParametrosModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProdutoModule { }
