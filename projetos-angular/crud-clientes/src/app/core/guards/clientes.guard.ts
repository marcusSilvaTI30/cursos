import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { ClientesService } from 'src/app/pages/clientes/clientes.service';
import { Cliente } from './../../shared/models/cliente.model';


@Injectable({
  providedIn: 'root'
})
export class ClienteGuard implements Resolve<Cliente> {

  constructor(
    private service: ClientesService
  ) { }

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : Cliente | Observable<Cliente>| Promise<Cliente>{
    if(route.params && route.params['id']){
      return this.service.loadById(route.params['id']);
    }

    return of({id: 0, nome:'', cpf: '', dataNascimento: '', dataCadastro: '', renda: '', email: ''});
  }

}
