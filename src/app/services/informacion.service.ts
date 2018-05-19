import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class InformacionService {

  info:any = {};
  cargada:boolean = false;
  cargada_sobre_nosotros:boolean = false;
  equipo:any[] = []

  constructor( public http:Http ) {

    this.carga_info();
    this.carga_sobre_nosotros();

   }

   public carga_info(){
     this.http.get("assets/data/info.pagina.json")
              .subscribe( data =>{
                this.cargada = true;
                this.info = data.json();
              } )
   }

   public carga_sobre_nosotros(){
     this.http.get("https://portafolio-7e9be.firebaseio.com/equipo.json")
              .subscribe( data =>{
                this.cargada_sobre_nosotros = true;
                this.equipo = data.json();
              } )
   }
}
