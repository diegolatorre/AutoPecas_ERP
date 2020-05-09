import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgZorroModule } from '../shared/ngZorro.module';

@NgModule({
  declarations: [TabelaProdutoComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgZorroModule
  ]
})
export class ProdutoModule { }
