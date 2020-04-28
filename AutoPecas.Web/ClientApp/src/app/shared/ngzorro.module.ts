import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzFormModule } from 'ng-zorro-antd/form';

@NgModule({
  declarations: [],
  imports: [
    NzButtonModule,
    NzTableModule,
    NzGridModule,
    NzFormModule
  ],
  exports: [
    NzButtonModule,
    NzTableModule,
    NzGridModule,
    NzFormModule
  ]
})

export class NgzorroModule { }
