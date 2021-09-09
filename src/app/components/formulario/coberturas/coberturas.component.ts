import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cobertura } from 'src/app/models/coberturas.model';
import { GetService } from 'src/app/services/get.service';

@Component({
  selector: 'app-coberturas',
  templateUrl: './coberturas.component.html',
  styleUrls: ['./coberturas.component.css']
})
export class CoberturasComponent implements OnInit, OnDestroy {
  entitySubscription: Array<Subscription> = [];
  
  coberturas!: Cobertura[];

  @Output() coberturaSeleccionada: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private getService: GetService,
  ) { }

  ngOnInit(): void {
    this.cargarCoberturas();
  }

  ngOnDestroy(): void{
    this.entitySubscription.forEach(subscription => subscription.unsubscribe())
  }

  cargarCoberturas(): void{
    this.entitySubscription.push(
      this.getService.consultarCoberturas().subscribe(res=>{
        console.log(res);
        this.coberturas = res;
        this.ordenarCoberturas();
      })
    )
  }

  ordenarCoberturas(): void{
    this.coberturas.sort((a,b) => b.puntaje - a.puntaje );
  }

  seleccionarCobertura(cobertura: any): void{
    this.coberturaSeleccionada.emit(cobertura);
  }



}
