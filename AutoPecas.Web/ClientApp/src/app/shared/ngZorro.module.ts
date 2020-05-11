import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';

const modulos = [
  NzButtonModule,
  NzLayoutModule,
  NzMenuModule,
  NzTableModule,
  NzFormModule,
  NzInputModule,
  NzCheckboxModule
];

@NgModule({
  imports: [modulos],
  exports: [modulos]
})
export class NgZorroModule { }
