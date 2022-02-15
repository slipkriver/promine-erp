import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import 'rxjs-compat/add/operator/map';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //server: string = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  serverweb: string = "https://promine-ec.000webhostapp.com/servicios";

  constructor(
    private http: HttpClient
  ) { }


  getMenu() {
    return this.http.get("/assets/data/menu.json")
  }


  getSubMenu(nombre) {

    var listafill = []

    this.http.get("/assets/data/submenu.json").subscribe((res: any[]) => {

      res.forEach(element => {

        if (element['padre'] === nombre) {
          //console.log(element)
          listafill.push(element)
        }
        
      });

    })

    return listafill

  }


  getAspiranteLData(lista:string) {
    return <any>this.http.get("/assets/data/aspirantes/" + lista + ".json")
  }

  getEmpleadoLData(lista:string) {
    return <any>this.http.get("/assets/data/empleados/" + lista + ".json")
  }

  getDatos(){
    const body = JSON.stringify({'task':'listar'})
    //const x = parse this.serverweb + "/aspirante.php/?" + body
    //return this.http.get(this.serverweb + "/library/config.php")
    //return this.http.get(`${this.serverweb}/aspirante.php/?${body}`)
    return this.http.post(this.serverweb + "/aspirante.php",body)
    // .subscribe( res => {
    //   console.log(res, body)  
    // });

  }
  

}


