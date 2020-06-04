import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ngZorro.module';
import { AutoCompleteMarcaComponent } from './auto-complete/auto-complete-marca/auto-complete-marca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AutoCompleteCategoriaComponent } from './auto-complete/auto-complete-categoria/auto-complete-categoria.component';
import { AutoCompleteContatoComponent } from './auto-complete/auto-complete-contato/auto-complete-contato.component';
import { AutoCompleteProdutoComponent } from './auto-complete/auto-complete-produto/auto-complete-produto.component';

@NgModule({
  declarations: [AutoCompleteMarcaComponent, AutoCompleteCategoriaComponent, AutoCompleteContatoComponent, AutoCompleteProdutoComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    AutoCompleteMarcaComponent,
    AutoCompleteCategoriaComponent,
    AutoCompleteContatoComponent,
    AutoCompleteProdutoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
