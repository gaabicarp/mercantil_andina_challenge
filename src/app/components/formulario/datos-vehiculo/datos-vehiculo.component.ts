import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-datos-vehiculo',
  templateUrl: './datos-vehiculo.component.html',
  styleUrls: ['./datos-vehiculo.component.css']
})
export class DatosVehiculoComponent implements OnInit {
  marcas: any;
  modelos: any;
  versiones: any;

  formData!: FormGroup;
  anios!: number[];

  minDate!: string | null;
  maxDate!: string | null;

  visibleModelo!: boolean;
  visibleVersion!: boolean;

  constructor(
    private getService: GetService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.cargarMarcas();
    this.cargarAnios();
    this.crearFormulario();
  }

  crearFormulario():void{
    this.formData = new FormGroup({
      marca: new FormControl(-1, Validators.required),
      anio: new FormControl(-1, Validators.required),
      modelo: new FormControl(-1, Validators.required),
      version: new FormControl(-1),
    })

    // Validators.pattern('^(?=.*[0-9]{3})?([15]|[11])\d{9}$') NUMERO TELEFONO - NO FUNCIONA -

    console.log(this.formData)
  }

  cargarMarcas(): void {
    this.visibleModelo = false;
    this.visibleVersion = true;
    this.getService.obtenerMarcaAuto().subscribe(res=> {
      console.log(res);
      this.marcas = res;
    })
  }

  cargarModelos(): void{
    if(this.formData.value.marca != -1 && this.formData.value.anio != -1){
      this.getService.obtenerModeloAuto(this.formData.value.marca, this.formData.value.anio).subscribe(res =>{
        this.modelos = res;
        this.visibleModelo = true;
      })
    }
  }

  cargaVersion(): void{
    this.getService.obtenerVersionAuto(this.formData.value.marca, this.formData.value.anio, this.formData.value.modelo).subscribe(res=>{
      console.log(res);
      console.log(this.visibleVersion);
      this.versiones = res;
      this.visibleVersion = false;
      console.log(this.visibleVersion);
    })
  }

  cargarAnios(): void{
    const max = new Date().getFullYear()
    const min = max - 20
    this.anios = []
  
    for (let i = max; i >= min; i--) {
        this.anios.push(i)
    }
  }

  submit(): void {
    console.log(this.formData)
  }

}
