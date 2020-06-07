import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaContatoComponent } from './tabela-contato/tabela-contato.component';
import { SucessoCadastroComponent } from '../contato/sucesso-cadastro/sucesso-cadastro.component';

const routes: Routes = [
  {
    path: '',
    component: TabelaContatoComponent,
  },
  {
    path: 'sucesso',
    component: SucessoCadastroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ContatoRoutingModule {}

export const RoutedComponents = [
  TabelaContatoComponent
];
export const EntryComponents = [

];
