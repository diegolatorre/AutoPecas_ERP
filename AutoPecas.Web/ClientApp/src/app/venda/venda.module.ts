import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { VendaRoutingModule } from './venda-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PontoVendaComponent } from './ponto-venda/ponto-venda.component';
import { SelecionaProdutoComponent } from './seleciona-produto/seleciona-produto.component';
import { ListaVendaComponent } from './lista-venda/lista-venda.component';
import { SucessoCadastroComponent } from './sucesso-cadastro/sucesso-cadastro.component';
import { FiltroVendaComponent } from './filtro-venda/filtro-venda.component';

@NgModule({
  declarations: [PontoVendaComponent, SelecionaProdutoComponent, ListaVendaComponent, SucessoCadastroComponent, FiltroVendaComponent],
  entryComponents: [SelecionaProdutoComponent],
  imports: [
    VendaRoutingModule,
    SharedModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VendaModule { }
