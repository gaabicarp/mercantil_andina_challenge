export interface MunicipioResponse {
    cantidad: number;
    inicio: number;
    municipios: Municipio[];
    parametros: Parametros;
    total: number;
}
  
interface Parametros {
    campos: string[];
    provincia: string[];
}

export interface Municipio {
    id: string;
    nombre: string;
}

export interface ProvinciaResponse {
    cantidad: number;
    inicio: number;
    parametros: Parametros;
    provincias: Provincia[];
    total: number;
}
  
export interface Provincia {
    centroide: Centroide;
    id: string;
    nombre: string;
}

interface Centroide {
    lat: number;
    lon: number;
}

interface Parametros {
}