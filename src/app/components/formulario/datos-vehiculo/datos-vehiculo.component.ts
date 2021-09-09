import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MarcaVersion } from 'src/app/models/vehiculos.model';
import { GetService } from 'src/app/services/get.service';
import { textChangeRangeIsUnchanged } from 'typescript';

@Component({
  selector: 'app-datos-vehiculo',
  templateUrl: './datos-vehiculo.component.html',
  styleUrls: ['./datos-vehiculo.component.css']
})
export class DatosVehiculoComponent implements OnInit, OnDestroy {
  entitySubscription: Array<Subscription> = [];
  
  marcas!: MarcaVersion[];
  modelos!: string[];
  versiones!: MarcaVersion[];

  formData!: FormGroup;
  anios!: number[];

  minDate!: string | null;
  maxDate!: string | null;

  cargandoModelos!: boolean;
  cargandoVersiones!: boolean;

  visibleModelo!: boolean;
  visibleVersion!: boolean;

  @Output() datosVehiculo: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private getService: GetService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.cargarMarcas();
    this.cargarAnios();
    this.crearFormulario();
  }

  ngOnDestroy(): void{
    this.entitySubscription.forEach(subscription => subscription.unsubscribe())
  }

  crearFormulario():void{
    this.formData = new FormGroup({
      marca: new FormControl('', Validators.required),
      anio: new FormControl('', Validators.required),
      modelo: new FormControl('', Validators.required),
      version: new FormControl(''),
    })

    // Validators.pattern('^(?=.*[0-9]{3})?([15]|[11])\d{9}$') NUMERO TELEFONO - NO FUNCIONA -

    console.log(this.formData)
  }

  cargarMarcas(): void {
    this.visibleModelo = false;
    this.visibleVersion = true;
    this.entitySubscription.push(
      this.getService.obtenerMarcaAuto().subscribe(res=> {
        console.log(res);
        this.marcas = res.filter((marca: MarcaVersion)=> marca.codigo != 0);
      })
    )
  }

  cargarModelos(): void{
    if(this.formData.value.marca != '' && this.formData.value.anio != ''){
      this.cargandoModelos = true;
      this.entitySubscription.push(
        this.getService.obtenerModeloAuto(this.formData.value.marca.codigo, this.formData.value.anio).subscribe(res =>{
          console.log(res);
          this.modelos = res;
          this.cargandoModelos = false;
          if(this.modelos.length > 0){
            this.visibleModelo = true;
            
          } else{
            this.visibleModelo = false;
            this.formData.patchValue({
              modelo:'-1'
            })
          }
        })
      )
    }
  }

  cargaVersion(): void{
    this.cargandoVersiones = true;
    this.entitySubscription.push(
      this.getService.obtenerVersionAuto(this.formData.value.marca.codigo, this.formData.value.anio, this.formData.value.modelo).subscribe(res=>{
        console.log(res);
        this.versiones = res;
        this.cargandoVersiones = false;
        if (this.versiones.length > 0)
          this.visibleVersion = true;
        else
          this.visibleVersion = false;
          this.formData.patchValue({
            version: '-1'
          })
      })
    )
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
    this.datosVehiculo.emit(this.formData.value);
  }

}
