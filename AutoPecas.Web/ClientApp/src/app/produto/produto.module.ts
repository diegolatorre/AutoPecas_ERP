import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgZorroModule } from '../shared/ngZorro.module';
import { CadeiraRoutingModule } from './produto-routing.module';

@NgModule({
  declarations: [TabelaProdutoComponent],
  imports: [
    CadeiraRoutingModule,
    CommonModule,
    SharedModule,
    NgZorroModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProdutoModule { }
