import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroModule } from './ngZorro.module';

@NgModule({
  declarations: [],
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
