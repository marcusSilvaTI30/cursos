import { ClienteGuard } from './../../core/guards/clientes.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ClientesFormComponent } from './clientes-form/clientes-form.component';

const routes: Routes = [
  {path: '', component:ClientesComponent},
  {
    path: 'novo',
    component: ClientesFormComponent,
    resolve: {cliente: ClienteGuard}
  },
  {
    path: 'editar/:id', component: ClientesFormComponent,
    resolve: {cliente: ClienteGuard}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { }
