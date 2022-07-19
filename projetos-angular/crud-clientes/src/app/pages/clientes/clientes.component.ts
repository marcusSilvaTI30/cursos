import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { catchError, EMPTY, filter, map, mapTo, Observable, of, Subject, switchMap, take } from 'rxjs';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { Cliente } from 'src/app/shared/models/cliente.model';
import { ClientesService } from './clientes.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {

  page: number = 1;
  itemPage: number = 5;
  tableSizes: any = [5,10,15,20];

  clientes$!: any;
  error$ = new Subject<boolean>();

  deleteModalRef!: BsModalRef;
  clienteSelecionado!: Cliente;

  form: FormGroup = new FormGroup({});


  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private router: Router,
    private route: ActivatedRoute,
    private alertService: AlertModalService
  ) {
    this.onRefresh('');
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      search: []
    });
  }

  onRefresh(search: string) {
    this.clienteService.getClientes().subscribe(
      data => {
        if (search == '') {
          this.clientes$ = data;
        } else {
          this.clientes$ = data.filter(data => data.nome.indexOf(search) > -1 ? data : null);
        }

        console.log(this.clientes$);
      }
    );
  }

  onEdit(id: any) {
    this.router.navigate(['editar', id], {relativeTo: this.route});
  }

  onDelete(cliente:any){
    const result$ = this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse cliente?', 'Ok', 'Cancelar');

    result$.asObservable()
    .pipe(
      take(1),
      switchMap(result => result ? this.clienteService.removeById(cliente.id) : EMPTY )
    )
    .subscribe(
      success => {
        this.onRefresh('');
        this.form.reset();
        this.alertService.showAlertSuccess("Cliente removido com sucesso.");
      },
      error => this.alertService.showAlertDanger("Erro ao remover cliente. Tente novamente mais tarde.")
    )
  }

  onConfirmDelete(){
    this.clienteService.removeById(this.clienteSelecionado.id)
    .subscribe(
      success => {
        this.onRefresh(''),
        this.alertService.showAlertSuccess("Cliente removido com sucesso.");
      },
      error => this.alertService.showAlertDanger("Erro ao remover cliente. Tente novamente mais tarde.")
    );
    this.deleteModalRef.hide();
  }

  onDeclineDelete(){
    this.alertService.showConfirm('Confirmação', 'Tem certeza que deseja remover esse cliente?', 'Ok', 'Cancelar');
  }

  onTableDataChange(event: any){
   this.page = event;
   this.onRefresh('');
  }

  onSearchTable(){
    const search = this.form.value.search;
    this.onRefresh(search);
  }
}
