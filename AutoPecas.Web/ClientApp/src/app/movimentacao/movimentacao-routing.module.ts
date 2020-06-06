import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CadastroEntradaComponent } from './entrada/cadastro-entrada/cadastro-entrada.component';
import { TabelaEntradaComponent } from './entrada/tabela-entrada/tabela-entrada.component';


const routes: Routes = [
  {
    path: 'entrada',
    component: TabelaEntradaComponent
  },
  {
    path: 'entrada/cadastro',
    component: CadastroEntradaComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovimentacaoRoutingModule { }
