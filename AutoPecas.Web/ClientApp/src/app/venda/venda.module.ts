import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedComponents, EntryComponents } from '../produto/produto-routing.module';
import { VendaRoutingModule } from './venda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PontoVendaComponent } from './ponto-venda/ponto-venda.component';
import { SelecionaProdutoComponent } from './seleciona-produto/seleciona-produto.component';

@NgModule({
  declarations: [PontoVendaComponent, SelecionaProdutoComponent],
  entryComponents: [SelecionaProdutoComponent],
  imports: [
    VendaRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VendaModule { }
