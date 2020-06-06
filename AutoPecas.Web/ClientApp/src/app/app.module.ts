import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './main/app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      {
        path: 'produto',
        loadChildren: () =>
          import('./produto/produto.module').then((m) => m.ProdutoModule)
      },
      {
        path: 'contato',
        loadChildren: () =>
          import('./contato/contato.module').then((m) => m.ContatoModule)
      },
      {
        path: 'venda',
        loadChildren: () =>
          import('./venda/venda.module').then((m) => m.VendaModule)
      },
      {
        path: 'movimentacao',
        loadChildren: () =>
          import('./movimentacao/movimentacao.module').then((m) => m.MovimentacaoModule)
      },
    ]),
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
