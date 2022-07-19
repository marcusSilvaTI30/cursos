import { ClientesFormComponent } from './clientes-form/clientes-form.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CursosRoutingModule } from './clientes.routing.module';
import { NgxMaskModule } from 'ngx-mask';
import { NgxPaginationModule } from 'ngx-pagination';



@NgModule({
  declarations: [
    ClientesFormComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CursosRoutingModule,
    NgxMaskModule.forChild(),
    NgxPaginationModule
  ]
})
export class ClientesModule { }
