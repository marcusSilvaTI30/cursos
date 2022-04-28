import { AlertModalComponent } from './../../shared/alert-modal/alert-modal.component';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, empty, Observable, of, Subject, take, switchMap } from 'rxjs';
import { Curso } from '../curso';
import { CursosService } from './cursos.service';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Cursos2Service } from '../cursos2.service';

@Component({
  selector: 'app-cursos-lista',
  templateUrl: './cursos-lista.component.html',
  styleUrls: ['./cursos-lista.component.scss'],
  preserveWhitespaces: true
})
export class CursosListaComponent implements OnInit {

  bsModalRef!: BsModalRef;

  cursos$!: Observable<Curso[]>;
  error$ = new Subject<boolean>();

  deleteModalRef!: BsModalRef;
  cursoSelecionado!: Curso;

  @ViewChild('deleteModal') deleteModal:any;

  constructor(
    private service: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {
    this.onRefresh();
   }

  ngOnInit(): void {

    // this.service.list()
    //  .subscribe(
    //    dados => this.cursos = dados
    // );
  }

  onRefresh(){
    this.cursos$ = this.service.list()
    .pipe(
      catchError(error=> {
        console.error(error);
        this.error$.next(true);
        return of();
      })
    );

    this.service.list()
    .pipe(
      catchError(error=> {
        console.error(error);
       // this.error$.next(true);
        this.handleError();
        return of();
      })
    )
    .subscribe(
      dados =>{
        console.log(dados);
      },
      error => console.error(error),
      () => console.log('Observable completo!')
    )
  }

  handleError(){
    this.alertService.showAlertDanger("Erro ao carregar cursos. Tente novamente");
  }

  onEdit(id:number){
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(curso:any){
    //this.deleteModalRef = this.modalService.show(this.deleteModal, {class: 'modal-sm'});
    //this.cursoSelecionado = curso;
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?', 'Ok', 'Cancelar');

    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.service.remove(curso.id) : EMPTY )
    )
    .subscribe(
      success => {
        this.onRefresh(),
        this.alertService.showAlertSuccess("Curso removido com sucesso.");
      },
      error => this.alertService.showAlertDanger("Erro ao remover curso. Tente novamente mais tarde.")
    )
  }

  onConfirmDelete(){
    this.service.remove(this.cursoSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh(),
        this.alertService.showAlertSuccess("Curso removido com sucesso.");
      },
      error => this.alertService.showAlertDanger("Erro ao remover curso. Tente novamente mais tarde.")
    );
    this.deleteModalRef.hide();
  }

  onDeclineDelete(){
    //this.deleteModalRef.hide();
    this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse curso?', 'Ok', 'Cancelar');
  }

}
