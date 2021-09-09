import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Municipio, MunicipioResponse, Provincia, ProvinciaResponse } from '../models/provincia.model';
import { MarcaVersion } from '../models/vehiculos.model';
import { Cobertura } from '../models/coberturas.model';

@Injectable({
  providedIn: 'root'
})
export class GetService {
  private API_MA = 'https://servicios.qamercantilandina.com.ar/api/v1';
  private API_MOCK = 'https://servicios.qamercantilandina.com.ar/api_mock_frontend/v1';
  private API_GEO = 'https://apis.datos.gob.ar/georef/api';
  
  constructor(private http: HttpClient ) { }

  obtenerProvincias(): Observable<ProvinciaResponse>{
    return this.http.get<ProvinciaResponse>(this.API_GEO + '/provincias')
  }

  obtenerMunicipios(idProvincia: number): Observable<MunicipioResponse>{
    return this.http.get<MunicipioResponse>(this.API_GEO + `/municipios?provincia=${idProvincia}&campos=id,nombre`)
  }


  consultarDisponibilidad(usuario: string): Observable<boolean>{
    return this.http.get<boolean>(this.API_MOCK + `/usuarios?nombre=${usuario}`);
  }

  consultarCoberturas(): Observable<Cobertura[]>{
    return this.http.get<Cobertura[]>(this.API_MOCK + '/coberturas');
  }


  obtenerMarcaAuto(): Observable<MarcaVersion[]>{
    return this.http.get<MarcaVersion[]>(this.API_MA + '/vehiculos/marcas');
  }

  obtenerModeloAuto(codigo: string,anio: string): Observable<string[]>{
    return this.http.get<string[]>(this.API_MA + `/vehiculos/marcas/${codigo}/${anio}`);
  }

  obtenerVersionAuto(codigo: string,anio: string, modelo: string): Observable<MarcaVersion[]>{
    return this.http.get<MarcaVersion[]>(this.API_MA + `/vehiculos/marcas/${codigo}/${anio}/${modelo}`);
  }


}
