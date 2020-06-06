import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TabelaCategoriaComponent } from './categoria/tabela-categoria/tabela-categoria.component';
import { CadastroCategoriaComponent } from './categoria/cadastro-categoria/cadastro-categoria.component';
import { CadastroMarcaComponent } from './marca/cadastro-marca/cadastro-marca.component';
import { TabelaMarcaComponent } from './marca/tabela-marca/tabela-marca.component';

const routes: Routes = [
  {
    path: 'categoria',
    component: TabelaCategoriaComponent,
  },
  {
    path: 'categoria/editar/:id',
    component: CadastroCategoriaComponent,
  },
  {
    path: 'marca',
    component: TabelaMarcaComponent,
  },
  {
    path: 'marca/editar/:id',
    component: CadastroMarcaComponent
  }
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
