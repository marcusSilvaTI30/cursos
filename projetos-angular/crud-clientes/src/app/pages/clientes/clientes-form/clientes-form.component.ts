import { ClientesService } from 'src/app/pages/clientes/clientes.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { AlertModalService } from 'src/app/shared/alert-modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { GenericValidator } from 'src/app/core/validators/GenericValidator';

@Component({
  selector: 'clientes-form',
  templateUrl: './clientes-form.component.html',
  styleUrls: ['./clientes-form.component.scss'],
  providers: [DatePipe]
})
export class ClientesFormComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  submitted: boolean = false;
  isEdit: boolean = false;
  title = 'CADASTRAR';

  constructor(
    private fb: FormBuilder,
    private clienteService: ClientesService,
    private modal: AlertModalService,
    private location: Location,
    private router: Router,
    private route: ActivatedRoute,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const cliente = this.route.snapshot.data['cliente'];

    if (cliente.id) {
      this.title = 'EDITAR';
      this.isEdit = true;
    }

    this.form = this.fb.group({
      id: [cliente.id],
      nome: [cliente.nome, [Validators.required, Validators.minLength(3), Validators.maxLength(250), GenericValidator.isValidSobrenome()]],
      cpf: [cliente.cpf, [Validators.required, GenericValidator.isValidCpf()]],
      dataNascimento: [this.formattedDateInput(cliente.dataNascimento), [Validators.required, GenericValidator.isValidIdade()]],
      dataCadastro: [cliente.dataCadastro],
      renda: [cliente.renda.replace(".", ","), [Validators.required]],
      email: [cliente.email, [Validators.required, Validators.email]]
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.form.valid) {

      let msgSuccess = 'Cliente incluído com sucesso!';
      let msgError = 'Erro ao incluir cliente, tente novamente!';

      if (this.form.value.id) {
        msgSuccess = 'Cliente atualizado com sucesso!';
        msgError = 'Erro ao atualizar cliente, tente novamente!';
      }

      if (!this.form.value.id) {
        this.form.value.dataCadastro = this.datePipe.transform(new Date(), "yyyy-MM-dd");
      }

      this.form.value.dataNascimento = this.formattedDateBackend(this.form.value.dataNascimento);

      this.clienteService.save(this.form.value).subscribe(
        success => {
          this.modal.showAlertSuccess(msgSuccess);
          this.location.back();
        },
        error => this.modal.showAlertDanger(msgError)
      );
    }
  }

  hasError(field: string) {
    return this.form.get(field)?.errors;
  }

  private formattedDateBackend(data: string) {
    return data.substr(4, 8) + "-" + data.substr(2, 2) + '-' + data.substr(0,2);
  }

  private formattedDateInput(data: string) {
    return data.substr(8,10)+data.substr(5,2)+data.substr(0,4);
  }
}
