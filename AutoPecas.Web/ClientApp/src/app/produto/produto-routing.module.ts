import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';

const routes: Routes = [
  {
    path: '',
    component: TabelaProdutoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadeiraRoutingModule {}

export const RoutedComponents = [
  TabelaProdutoComponent
];
export const EntryComponents = [];
