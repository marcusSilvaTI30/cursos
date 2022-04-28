import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diretiva-ngif',
  templateUrl: './diretiva-ngif.component.html',
  styleUrls: ['./diretiva-ngif.component.sass']
})
export class DiretivaNgifComponent implements OnInit {

  cursos: string[] = ["asd"];

  mostrarCursos: boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
