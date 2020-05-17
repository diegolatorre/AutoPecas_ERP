import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeiraRoutingModule, EntryComponents, RoutedComponents } from './produto-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { ParametrosModule } from './parametros/parametros.module';

@NgModule({
  declarations: [RoutedComponents, CadastroProdutoComponent, TabelaProdutoComponent],
  entryComponents: [EntryComponents],
  imports: [
    CadeiraRoutingModule,
    SharedModule,
    NzButtonModule,
    ReactiveFormsModule,
    ParametrosModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProdutoModule { }
