import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-operador-elvis',
  templateUrl: './operador-elvis.component.html',
  styleUrls: ['./operador-elvis.component.sass']
})
export class OperadorElvisComponent implements OnInit {

  tarefa: any = {
    desc: 'Descrição',
    responsavel: null
  }

  constructor() { }

  ngOnInit(): void {
  }

}
