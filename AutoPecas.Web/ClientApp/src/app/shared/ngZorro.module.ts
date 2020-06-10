import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzResultModule } from 'ng-zorro-antd/result';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzSliderModule } from 'ng-zorro-antd/slider';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';

const modulos = [
  NzButtonModule,
  NzLayoutModule,
  NzMenuModule,
  NzTableModule,
  NzFormModule,
  NzInputModule,
  NzCheckboxModule,
  NzCardModule,
  NzDrawerModule,
  NzDividerModule,
  NzDescriptionsModule,
  NzPaginationModule,
  NzPageHeaderModule,
  NzModalModule,
  NzSelectModule,
  NzAutocompleteModule,
  NzTabsModule,
  NzDatePickerModule,
  NzToolTipModule,
  NzSkeletonModule,
  NzDropDownModule,
  NzAlertModule,
  NzResultModule,
  NzRadioModule,
  NzPopconfirmModule,
  NzSliderModule,
  NzStatisticModule
];

@NgModule({
  imports: [modulos],
  exports: [modulos]
})
export class NgZorroModule { }
