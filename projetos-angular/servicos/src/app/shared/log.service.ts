import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  constructor() { }

  logServer(msg:string = ''){
    console.log(msg);
  }
}
