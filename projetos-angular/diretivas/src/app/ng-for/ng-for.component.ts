import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-for',
  templateUrl: './ng-for.component.html',
  styleUrls: ['./ng-for.component.sass']
})
export class NgForComponent implements OnInit {

  cursos: string[] = ["Angular", "Java", "C++"]
  constructor() { }

  ngOnInit(): void {
  }

}
