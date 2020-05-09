import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeiraRoutingModule, EntryComponents, RoutedComponents } from './produto-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';

@NgModule({
  declarations: [RoutedComponents],
  entryComponents: [EntryComponents],
  imports: [
    CadeiraRoutingModule,
    SharedModule,
    NzButtonModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ProdutoModule { }
