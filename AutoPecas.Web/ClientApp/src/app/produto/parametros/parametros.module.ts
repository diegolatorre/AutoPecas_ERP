import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeiraRoutingModule, EntryComponents, RoutedComponents } from './parametros-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { ReactiveFormsModule } from '@angular/forms';
import { TabelaCategoriaComponent } from './categoria/tabela-categoria/tabela-categoria.component';

@NgModule({
  declarations: [RoutedComponents, TabelaCategoriaComponent],
  entryComponents: [EntryComponents],
  imports: [
    CadeiraRoutingModule,
    SharedModule,
    NzButtonModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParametrosModule { }
