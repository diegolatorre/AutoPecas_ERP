import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VendaRoutingModule } from './venda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PontoVendaComponent } from './ponto-venda/ponto-venda.component';
import { SelecionaProdutoComponent } from './seleciona-produto/seleciona-produto.component';
import { ListaVendaComponent } from './lista-venda/lista-venda.component';

@NgModule({
  declarations: [PontoVendaComponent, SelecionaProdutoComponent, ListaVendaComponent],
  entryComponents: [SelecionaProdutoComponent],
  imports: [
    VendaRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VendaModule { }
