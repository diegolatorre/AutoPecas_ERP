import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { CadeiraRoutingModule, EntryComponents, RoutedComponents } from './parametros-routing.module';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { TabelaCategoriaComponent } from './categoria/tabela-categoria/tabela-categoria.component';
import { CadastroCategoriaComponent } from './categoria/cadastro-categoria/cadastro-categoria.component';

@NgModule({
  declarations: [RoutedComponents, CadastroCategoriaComponent, TabelaCategoriaComponent],
  entryComponents: [EntryComponents],
  imports: [
    CadeiraRoutingModule,
    SharedModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzTableModule,
    NzInputModule,
    NzIconModule,
    NzFormModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ParametrosModule { }
