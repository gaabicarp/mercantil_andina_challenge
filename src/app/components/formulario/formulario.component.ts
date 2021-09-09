import { Component, OnInit } from '@angular/core';
import { datosPersonales } from 'src/app/models/datosPersonales.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})


export class FormularioComponent implements OnInit {
  datosPersonales!: any;
  datosVehiculos!: any;
  coberturaElegida: any;

  step!: number;

  constructor() { }

  ngOnInit(): void {
    this.cargarDatosPrueba()
    this.step = 0;
  }

  getDatosPersonales(data: any): void{
    this.datosPersonales = data;
    this.step = 1;
  }

  getDatosVehiculo(data: any): void {
    console.log(data)
    this.datosVehiculos = data;
    this.step = 2;
  }

  getCoberturaElegida(data: any): void{
    console.log(data)
    this.coberturaElegida = data;
    this.step = 3;
  }

  cargarDatosPrueba(): void{
    this.datosPersonales = DatosPersonalesPrueba;
    this.datosVehiculos = datosVehiculoPrueba;
    this.coberturaElegida = datosCoberturaPrueba;

  }

  volver(): void{
    this.step = 0;
  }

}


const DatosPersonalesPrueba = {
  apellido: "Jotallan",
  celular: "1164793294",
  dni: 37688075,
  domicilio: "santa rosalia 2254",
  email: "gaabicarp@gmail.com",
  fechaNacimiento: "1993-06-20",
  municipio: {id: '060861', nombre: 'Vicente López'},
  nombre: "Gabriel",
  password: "Ggabii22",
  provincia: {id: '06', nombre: 'Buenos Aires'},
  usuario: "gaabicarp",
}

const datosVehiculoPrueba = {
  anio: "2005",
  marca: "30",
  modelo: "TERRANO II",
  version: "-1"
}

const datosCoberturaPrueba = {
  codigoProducto: 18,
  costo: 6321.15,
  descripcion: "Responsabilidad Civil limitada, Incendio total y parcial, Robo y/o Hurto total y parcial y Da±os totales y parciales por accidente. Incluye Franquicia.",
  franquicia: 100000,
  granizo: true,
  numero: 2,
  producto: "T3",
  puntaje: 5,
  texto: "T3 - R.C.L.- TODO RIESGO CON FRANQUICIA $ 100.000.-",
  titulo: "Todo Riesgo con Franquicia"
}