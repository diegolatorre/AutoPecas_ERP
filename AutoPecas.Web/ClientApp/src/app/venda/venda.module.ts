import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutedComponents, EntryComponents } from '../produto/produto-routing.module';
import { VendaRoutingModule } from './venda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NzTableModule } from 'ng-zorro-antd/table';
import { PontoVendaComponent } from './ponto-venda/ponto-venda.component';

@NgModule({
  declarations: [PontoVendaComponent],
  entryComponents: [EntryComponents],
  imports: [
    SharedModule,
    NzTableModule,
    VendaRoutingModule,
    CommonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VendaModule { }
