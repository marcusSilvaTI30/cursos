import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent {
  title = 'primeiro-projeto';
  subTitle = "Olá mundo!!";

  valorAtual : string = '';
  valorSalvo : string = '';
  isMouseOver : boolean = false;

 

  botaoClicado(){
    alert("Ok!!");
  }

  onKeyUp(evento: KeyboardEvent){
    
    this.valorAtual = (<HTMLInputElement>evento.target).value;
  }

  salvarValor(valor: string){
    this.valorSalvo = valor;
  }

  onMouseOverOut(){
    this.isMouseOver = !this.isMouseOver;
  }

}
