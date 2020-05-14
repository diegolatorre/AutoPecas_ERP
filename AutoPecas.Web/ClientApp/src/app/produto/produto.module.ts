import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProdutoRoutingModule, EntryComponents, RoutedComponents } from './produto-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [RoutedComponents, CadastroProdutoComponent],
  entryComponents: [EntryComponents],
  imports: [
    ProdutoRoutingModule,
    SharedModule,
    NzButtonModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProdutoModule { }
