import { AuthGuard } from './../seguranca/auth.guard';
import { ArteCompraComponent } from './arte-compra/arte-compra.component';
import { ArteComponent } from './arte/arte.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { ArteIndexComponent } from './arte-index/arte-index.component';
import { ArtePesquisaComponent } from './arte-pesquisa/arte-pesquisa.component';
import { NovaComponent } from './nova/nova.component';


const routes: Routes = [
  {
    path: 'home',
    component: ArteIndexComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'artes',
    component: ArtePesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ARTE']}
  },
  { path: 'artes/nova',
    component: NovaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ARTE']}
  },
  {
    path: 'artes/:codigo',
    component: NovaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_ARTE']}
  },
  { path: 'arte/:codigo',
  component: ArteComponent,
  canActivate: [AuthGuard],
  data: { roles: ['ROLE_PESQUISAR_ARTE']}
  },
  {
    path: 'arte/:codigo/comprar',
    component: ArteCompraComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_ARTE']}
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ArtesRoutingModule { }
