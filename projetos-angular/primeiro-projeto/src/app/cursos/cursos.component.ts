import { CursosService } from './cursos.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss']
})
export class CursosComponent implements OnInit {

  nomePortal: string;
  cursos: string[] = [];
  nome: string = "teste ";

  constructor(private cursosService: CursosService) {
    this.nomePortal = "http://www.loiane.training.com";  
    
    this.cursos = this.cursosService.getCursos();


  }

  ngOnInit(): void {
  }

}
