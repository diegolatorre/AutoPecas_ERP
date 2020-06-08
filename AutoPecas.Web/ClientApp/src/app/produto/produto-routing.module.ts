import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaProdutoComponent } from './tabela-produto/tabela-produto.component';
import { CadastroProdutoComponent } from './cadastro-produto/cadastro-produto.component';
import { SucessoCadastroComponent } from './sucesso-cadastro/sucesso-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: TabelaProdutoComponent,
  },
  {
    path: 'cadastro',
    component: CadastroProdutoComponent,
  },
  {
    path: 'sucesso',
    component: SucessoCadastroComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProdutoRoutingModule {}

export const RoutedComponents = [

];
export const EntryComponents = [
  TabelaProdutoComponent
];
