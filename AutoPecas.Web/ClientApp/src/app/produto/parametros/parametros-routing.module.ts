import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaCategoriaComponent } from './categoria/tabela-categoria/tabela-categoria.component';
import { CadastroCategoriaComponent } from './categoria/cadastro-categoria/cadastro-categoria.component';

const routes: Routes = [
  {
    path: 'categoria',
    component: TabelaCategoriaComponent,
  },
  {
    path: 'categoria/cadastro',
    component: CadastroCategoriaComponent,
  },
  {
    path: 'categoria/editar/:id',
    component: CadastroCategoriaComponent,
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
