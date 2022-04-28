import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; //Utilizado em mod. de funcionalidade se fosse mod. raiz seria BrowserModule

import { CursosService } from '../cursos/cursos.service';
import { CriarCursoComponent } from './criar-curso.component';
import { ReceberCursoCriadoComponent } from '../receber-curso-criado/receber-curso-criado.component';

@NgModule({
  declarations: [
    CriarCursoComponent,
    ReceberCursoCriadoComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    CriarCursoComponent
  ],
  providers: [
    CursosService
  ]
})
export class CriarCursoModule { }
