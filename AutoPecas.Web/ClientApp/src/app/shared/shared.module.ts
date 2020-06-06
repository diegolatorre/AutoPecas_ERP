import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ngZorro.module';
import { AutoCompleteMarcaComponent } from './auto-complete/auto-complete-marca/auto-complete-marca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { AutoCompleteCategoriaComponent } from './auto-complete/auto-complete-categoria/auto-complete-categoria.component';
import { AutoCompleteContatoComponent } from './auto-complete/auto-complete-contato/auto-complete-contato.component';
import { AutoCompleteProdutoComponent } from './auto-complete/auto-complete-produto/auto-complete-produto.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  thousandSeparator: '.',
  decimalMarker: ',',
};

@NgModule({
  declarations: [AutoCompleteMarcaComponent, AutoCompleteCategoriaComponent, AutoCompleteContatoComponent, AutoCompleteProdutoComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
  ],
  exports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    AutoCompleteMarcaComponent,
    AutoCompleteCategoriaComponent,
    AutoCompleteContatoComponent,
    AutoCompleteProdutoComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
