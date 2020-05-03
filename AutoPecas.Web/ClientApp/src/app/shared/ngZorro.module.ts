import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';

const modulos = [
  NzButtonModule,
  NzLayoutModule,
  NzMenuModule
];

@NgModule({
  imports: [modulos],
  exports: [modulos]
})
export class NgZorroModule { }
