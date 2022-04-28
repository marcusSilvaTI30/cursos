import { CursosResolverGuard } from './../guards/cursos-resolver.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosFormComponent } from '../cursos-form/cursos-form.component';
import { CursosListaComponent } from './cursos-lista/cursos-lista.component';

const routes: Routes = [
  {path: '', component:CursosListaComponent},
  {path: 'novo', component: CursosFormComponent,
    resolve: {curso: CursosResolverGuard}
  },
  {path: 'editar/:id', component: CursosFormComponent,
   resolve: {curso: CursosResolverGuard}
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class CursosRoutingModule { }
