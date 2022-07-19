import { ClientesModule } from './pages/clientes/clientes.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'clientes'
  },{
    path: 'clientes',
    loadChildren: () => import('./pages/clientes/clientes.module').then(c => c.ClientesModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
