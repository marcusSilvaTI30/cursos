import { UploadFileModule } from './upload-file/upload-file.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo:'home'
  },{
    path: 'home',
    loadChildren: () => import('./home/home.module').then(c => c.HomeModule)
  },{
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then(c => c.CursosModule)
  },{
    path: 'upload',
    loadChildren: () => import('./upload-file/upload-file.module').then(u => u.UploadFileModule)
  },{
    path: 'search',
    loadChildren: () => import('./reactive-search/reactive-search.module').then(u => u.ReactiveSearchModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
