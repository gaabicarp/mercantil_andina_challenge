export interface Provincia{
    id: number;
    nombre: string;
    centroide:{
        lat: number;
        lonm: number;
    }
}

export interface Municipio{
    id: number;
    nombre: string;
}