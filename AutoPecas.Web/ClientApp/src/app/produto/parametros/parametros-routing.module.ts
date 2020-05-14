import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaCategoriaComponent } from './categoria/tabela-categoria/tabela-categoria.component';

const routes: Routes = [
  {
    path: 'categoria',
    component: TabelaCategoriaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadeiraRoutingModule {}

export const RoutedComponents = [
  TabelaCategoriaComponent
];
export const EntryComponents = [
  TabelaCategoriaComponent
];
