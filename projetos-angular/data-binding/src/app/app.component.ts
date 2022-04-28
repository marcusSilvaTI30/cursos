import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'data-binding';
  nomeDoCurso : string = "Angular 2x";
  valorInicial: number = 15;

  onMudouValor(evento: any){
    console.log(evento.novoValor);
  }

}
