import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //Utilizado em mod. de funcionalidade se fosse mod. raiz seria BrowserModule

import { CursosService } from '../cursos/cursos.service';
import { CursosComponent } from './cursos.component';

@NgModule({
  declarations: [
    CursosComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CursosComponent
  ],
  providers: [
   // CursosService
  ]
})
export class CursosModule { }
