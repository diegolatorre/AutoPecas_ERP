import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';

const routes: Routes = [
  {
    path: '',
    component: TabelaProdutoComponent,
  },
  {
    path: 'cadastro',
    component: CadastroProdutoComponent,
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
export const EntryComponents = [
  TabelaProdutoComponent
];
