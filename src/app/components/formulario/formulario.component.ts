import { Component, OnInit } from '@angular/core';
import { datosPersonales } from 'src/app/models/datosPersonales.model';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {
  datosPersonales!: datosPersonales;
  step!: number;

  constructor() { }

  ngOnInit(): void {
    this.step = 1;
  }

  getDatosPersonales(data: any): void{
    this.datosPersonales = data;
    this.step = 1;
  }



}
