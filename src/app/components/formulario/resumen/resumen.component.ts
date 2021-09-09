import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.css']
})
export class ResumenComponent implements OnInit {
  @Input() datosPersonales:any;  
  @Input() datosVehiculos:any;  
  @Input() CoberturaElegida:any;

  @Output() volviendo: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
    console.log(this.datosPersonales)
    console.log(this.datosVehiculos)
    console.log(this.CoberturaElegida)
  }

  volver():void{
    this.volviendo.emit()
  }

}
