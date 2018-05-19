import { Injectable } from '@angular/core';
import { Http } from '@angular/http';


@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  productos:any[] = [];
  productosFiltrados:any[] = [];
  cargando:boolean = true;

  constructor( private http:Http ) {
    this.cargarProductos();
  }

  public cargarProductos(){

    let promesa = new Promise(( resolve, reject) =>{
      this.cargando = true;
          this.http.get("https://portafolio-7e9be.firebaseio.com/productos_idx.json")
                  .subscribe( res => {
                    this.productos = res.json();
                    this.cargando = false;
                    resolve();
                  });
    }) ;
    return promesa;
  }

  public buscarProducto(termino:string){

    if (this.productos.length === 0) {
        this.cargarProductos().then(()=>{
          this.filtrarProductos(termino);
        });
    }else{
      this.filtrarProductos(termino);
    }
  }

  private filtrarProductos(termino:string){
    this.productosFiltrados = [];
    termino = termino.toLowerCase();

    this.productos.forEach( prod =>{

      if (prod.categoria.indexOf( termino ) >=0 || prod.titulo.toLowerCase().indexOf( termino ) >=0) {
          this.productosFiltrados.push(prod);
      }
    })
  }

  public cargarProducto( cod:string ){
    return this.http.get(`https://portafolio-7e9be.firebaseio.com/productos/${cod}.json`)
  }
}
