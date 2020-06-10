import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgZorroModule } from "./ngZorro.module";
import { AutoCompleteMarcaComponent } from "./auto-complete/auto-complete-marca/auto-complete-marca.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgxMaskModule, IConfig } from "ngx-mask";
import { MomentModule } from "ngx-moment";
import 'moment/locale/pt-br';
import { AutoCompleteCategoriaComponent } from "./auto-complete/auto-complete-categoria/auto-complete-categoria.component";
import { AutoCompleteContatoComponent } from "./auto-complete/auto-complete-contato/auto-complete-contato.component";
import { AutoCompleteProdutoComponent } from "./auto-complete/auto-complete-produto/auto-complete-produto.component";

/* Icon Configuration */
import { IconDefinition } from "@ant-design/icons-angular";
import { NzIconModule } from "ng-zorro-antd/icon";
import {
  AccountBookFill,
  AlertFill,
  AlertOutline,
  SearchOutline,
  UserAddOutline,
  PlusSquareOutline,
  PlusSquareFill,
  AppstoreAddOutline,
  ClearOutline,
  FilterOutline,
  SaveOutline,
  RollbackOutline,
  CloseSquareOutline,
  DollarTwoTone,
  ArrowsAltOutline
} from "@ant-design/icons-angular/icons";
const icons: IconDefinition[] = [
  AccountBookFill,
  AlertOutline,
  AlertFill,
  SearchOutline,
  UserAddOutline,
  PlusSquareOutline,
  PlusSquareFill,
  AppstoreAddOutline,
  ClearOutline,
  FilterOutline,
  SaveOutline,
  RollbackOutline,
  CloseSquareOutline,
  DollarTwoTone,
  ArrowsAltOutline
];

export const options: Partial<IConfig> | (() => Partial<IConfig>) = {
  thousandSeparator: ".",
  decimalMarker: ",",
};

@NgModule({
  declarations: [
    AutoCompleteMarcaComponent,
    AutoCompleteCategoriaComponent,
    AutoCompleteContatoComponent,
    AutoCompleteProdutoComponent,
  ],
  imports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule.forRoot(options),
    NzIconModule.forRoot(icons),
    MomentModule,
  ],
  exports: [
    CommonModule,
    NgZorroModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    MomentModule,
    NzIconModule,
    AutoCompleteMarcaComponent,
    AutoCompleteCategoriaComponent,
    AutoCompleteContatoComponent,
    AutoCompleteProdutoComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SharedModule {}
