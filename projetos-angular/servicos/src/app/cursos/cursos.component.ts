import { Component, OnInit } from '@angular/core';

import {CursosService} from './cursos.service'

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
  providers: [
    CursosService
  ]
})
export class CursosComponent implements OnInit {

  cursos:string[] = [];

  cursosService: CursosService;

  constructor(
    _cursosService: CursosService //injenção de dependencia
  ) {
    this.cursosService = _cursosService;
   }

  ngOnInit(): void {
    this.cursos = this.cursosService.getCursos();

    //notifica o componente toda vez que criar um novo curso em outro componente
    CursosService.criouNovoCurso.subscribe(
        curso=>this.cursos.push(curso)
    );
  }

}
