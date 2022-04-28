import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ng-class',
  templateUrl: './ng-class.component.html',
  styleUrls: ['./ng-class.component.sass']
})
export class NgClassComponent implements OnInit {
  
  meuFavorito:boolean = false;
  ativo:boolean = false;
  tamanhoFonte:number = 10;
  
  constructor() { }

  ngOnInit(): void {
  }

  onClick(){
    this.meuFavorito = !this.meuFavorito;
  }

  mudarAtivo(){
    this.ativo = !this.ativo;
  }

}
