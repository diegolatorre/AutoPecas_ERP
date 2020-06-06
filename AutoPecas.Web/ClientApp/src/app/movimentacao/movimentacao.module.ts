import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';

import { CadastroEntradaComponent } from './entrada/cadastro-entrada/cadastro-entrada.component';
import { MovimentacaoRoutingModule } from './movimentacao-routing.module';
import { TabelaEntradaComponent } from './entrada/tabela-entrada/tabela-entrada.component';


@NgModule({
  declarations: [CadastroEntradaComponent, TabelaEntradaComponent],
  imports: [
    CommonModule,
    SharedModule,
    MovimentacaoRoutingModule
  ]
})
export class MovimentacaoModule { }
