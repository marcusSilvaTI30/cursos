import { Injectable, EventEmitter } from "@angular/core";
import { LogService } from "../shared/log.service";
@Injectable()
export class CursosService {

    emitirCursoCriado = new EventEmitter<string>();
    static criouNovoCurso = new EventEmitter<string>();

    private cursos:string[] = ["Angular 2", "Java", "Phonegap"];
    
    addCursos(curso:string = ''){
        this.logService.logServer(`Criando um novo curso ${curso}`)
        this.cursos.push(curso);
        this.emitirCursoCriado.emit(curso);
        CursosService.criouNovoCurso.emit(curso);
    }

    getCursos(){
        this.logService.logServer("Obtendo lista de cursos...")
        return this.cursos;
    }

    constructor(
        private logService: LogService
    ){
        this.logService.logServer("CursosService...")
    }

}