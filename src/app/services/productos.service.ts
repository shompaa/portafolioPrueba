import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos:any[] = [];
  cargando:boolean = true;

  constructor( private http:Http ) {
    this.cargarProductos();
  }

  public cargarProductos(){
    this.cargando = true;
        this.http.get("https://portafolio-7e9be.firebaseio.com/productos_idx.json")
                .subscribe( res => {
                  this.productos = res.json();
                  this.cargando = false;
                })
  }

  public cargarProducto( cod:string ){
    return this.http.get(`https://portafolio-7e9be.firebaseio.com/productos/${cod}.json`)
  }
}
