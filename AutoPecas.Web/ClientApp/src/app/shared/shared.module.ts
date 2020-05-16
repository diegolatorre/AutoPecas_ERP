import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ngZorro.module';
import { AutoCompleteMarcaComponent } from './auto-complete-marca/auto-complete-marca.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AutoCompleteMarcaComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    NgZorroModule,
    AutoCompleteMarcaComponent,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SharedModule { }
