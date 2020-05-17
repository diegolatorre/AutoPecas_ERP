import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaContatoComponent } from './tabela-contato/tabela-contato.component';

const routes: Routes = [
  {
    path: '',
    component: TabelaContatoComponent,
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
