import { CursosService } from './../cursos/cursos-lista/cursos.service';
import { Curso } from './../cursos/curso';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CursosResolverGuard implements Resolve<Curso> {

  constructor(
    private service: CursosService){
  }

  resolve(route: ActivatedRouteSnapshot,state: RouterStateSnapshot) : Curso | Observable<Curso>| Promise<Curso>{
    if(route.params && route.params['id']){
      return this.service.loadByID(route.params['id']);
    }


    return of({id: 0, nome: ''});
  }

}
