import { filter } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, Observable, tap, take } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  private readonly API = `${environment.API_CLIENTES}clientes`;

  constructor(
    private http: HttpClient
  ) {
  }

  getClientes(){
    return this.http.get<Cliente[]>(this.API)
      .pipe(
        delay(2000)
      );
  }

  getAllClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.API)
      .pipe(
        delay(2000),
        tap(console.log)
      );
  }

  loadById(id:any) {
    return this.http.get<Cliente>(`${this.API}/${id}`).pipe(take(1));
  }

  save(cliente:any) {
    if (cliente.id) {
      return this.update(cliente);
    }
    return this.create(cliente);
  }

  removeById(id: any){
    return this.http.delete(`${this.API}/${id}`).pipe(take(1));
  }

  private create(cliente:any) {
    return this.http.post(this.API, cliente).pipe(take(1));
  }

  private update(cliente:any) {
    return this.http.put(`${this.API}/${cliente.id}`, cliente).pipe(take(1));
  }
}
