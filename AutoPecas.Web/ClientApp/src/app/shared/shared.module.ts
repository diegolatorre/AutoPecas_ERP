import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ngZorro.module';
import { AutoCompleteMarcaComponent } from './auto-complete-marca/auto-complete-marca.component';

@NgModule({
  declarations: [AutoCompleteMarcaComponent],
  imports: [
    CommonModule,
    NgZorroModule
  ],
  exports: [
    CommonModule,
    NgZorroModule
  ]
})
export class SharedModule { }
