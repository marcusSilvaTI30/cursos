import { Component } from '@angular/core';
import { ClientesService } from './pages/clientes/clientes.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'crud-clientes';
}
