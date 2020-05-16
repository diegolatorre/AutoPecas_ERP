import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContatoRoutingModule, EntryComponents, RoutedComponents } from './contato-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TabelaContatoComponent } from './tabela-contato/tabela-contato.component';

@NgModule({
  declarations: [RoutedComponents, TabelaContatoComponent],
  entryComponents: [EntryComponents],
  imports: [
    ContatoRoutingModule,
    SharedModule,
    NzButtonModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ContatoModule { }
