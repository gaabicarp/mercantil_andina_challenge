import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';
import {Provincia, Municipio} from '../../../models/provincia.model';
import { DatePipe } from '@angular/common';
import { datosPersonales } from 'src/app/models/datosPersonales.model';

@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.css']
})
export class DatosPersonalesComponent implements OnInit {
  formData!: FormGroup;

  provincias!: Provincia[];
  municipios!: Municipio[];

  ocultarData!: boolean;
  existeUsuario!: boolean;

  minDate!: string | null;
  maxDate!: string | null;

  @Output() datosPersonales: EventEmitter<datosPersonales> = new EventEmitter<datosPersonales>();

  constructor(
    private getService: GetService,
    private datePipe: DatePipe
  ) {
   }

  ngOnInit(): void {
    this.cargarProvincias();
    this.validarFecha();
    this.crearFormulario();
    this.existeUsuario = false;
  }

  crearFormulario():void{
    this.formData = new FormGroup({
      nombre: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]),
      apellido: new FormControl('', [Validators.required, Validators.minLength(1), Validators.maxLength(15), Validators.pattern('^[a-zA-Z ]*$')]),
      usuario: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(30)]),
      password: new FormControl('', [Validators.required,         Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-z\d$@$!%*?&].{7,}')]),
      dni: new FormControl(null, [Validators.required, Validators.minLength(7),Validators.maxLength(8)]),
      email: new FormControl(null, Validators.email),
      celular: new FormControl(null),
      fechaNacimiento: new FormControl(null),
      provincia: new FormControl(-1, Validators.required),
      municipio: new FormControl(-1, Validators.required),
      domicilio: new FormControl('', Validators.required),
    })

    // Validators.pattern('^(?=.*[0-9]{3})?([15]|[11])\d{9}$') NUMERO TELEFONO - NO FUNCIONA -

    console.log(this.formData)
  }

  cargarProvincias(): void{
    this.ocultarData = false;
    this.getService.obtenerProvincias().subscribe(res => {
      this.provincias = res.provincias;
      console.log(this.provincias)
    })
  }

  cargarMunicipios(): void{
    this.ocultarData = true;
    this.getService.obtenerMunicipios(this.formData.value.provincia).subscribe(res => {
      console.log(res);
      this.municipios = res.municipios;
    })
  }

  consultarDisponibilidad(): void{
    console.log(this.formData.value.usuario.length)
    if(this.formData.value.usuario.length > 3){
      this.getService.consultarDisponibilidad(this.formData.value.usuario).subscribe(res=>{
        this.existeUsuario = res;
      })
    }
  }

  validarFecha(): void{
    const fechaActual = new Date();
    let year = fechaActual.getFullYear();
    let month = fechaActual.getMonth();
    let day = fechaActual.getDate();

    this.maxDate = this.datePipe.transform(new Date(year-18, month + 1, day),"yyy-MM-dd");
    this.minDate = this.datePipe.transform(new Date(year-99, month + 1, day),"yyy-MM-dd");
  }

  submit(): void{
    this.datosPersonales.emit(this.formData.value);
    // console.log(this.formData) 
  }

}

// [disabled]='!formData.valid || existeUsuario'
