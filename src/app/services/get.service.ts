import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private API_MA = 'https://servicios.qamercantilandina.com.ar/api/v1';
  private API_MOCK = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';
  private API_GEO = 'https://apis.datos.gob.ar/georef/api';
  
  constructor(private http: HttpClient ) { }

  obtenerProvincias(): Observable<any>{
    return this.http.get<any>(this.API_GEO + '/provincias')
  }

  obtenerMunicipios(idProvincia: number): Observable<any>{
    return this.http.get<any>(this.API_GEO + `/municipios?provincia=${idProvincia}&campos=id,nombre`)
  }


  consultarDisponibilidad(usuario: string): Observable<any>{
    return this.http.get<any>(this.API_MOCK + `/usuarios?nombre=${usuario}`)
  }


  obtenerMarcaAuto(): Observable<any>{
    return this.http.get<any>(this.API_MA + '/vehiculos/marcas');
  }

  obtenerModeloAuto(codigo: string,anio: string): Observable<any>{
    return this.http.get<any>(this.API_MA + `/vehiculos/marcas/${codigo}/${anio}`);
  }

  obtenerVersionAuto(codigo: string,anio: string, modelo: string): Observable<any>{
    return this.http.get<any>(this.API_MA + `/vehiculos/marcas/${codigo}/${anio}/${modelo}`);
  }
}
