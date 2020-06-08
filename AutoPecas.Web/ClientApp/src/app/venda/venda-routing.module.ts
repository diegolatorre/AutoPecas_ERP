import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PontoVendaComponent } from './ponto-venda/ponto-venda.component';
import { ListaVendaComponent } from './lista-venda/lista-venda.component';


const routes: Routes = [
  {
    path: '',
    component: PontoVendaComponent
  },
  {
    path: 'lista',
    component: ListaVendaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VendaRoutingModule {}

export const RoutedComponents = [

];
export const EntryComponents = [

];
