import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-principal-th',
  templateUrl: './principal-th.page.html',
  styleUrls: ['./principal-th.page.scss'],
})
export class PrincipalThPage implements OnInit {

  aspirantesNuevo = []

  constructor(
    private dataService: DataService,

  ) { }

  ngOnInit() {
  }

  buscarAspirante(event){

    if(event.detail.value.length < 3) return

    this.dataService.getListanuevos(event.detail.value).subscribe( res => {
      //console.log(res['result'])
      if(res['result'] && res['result'].length > 0){
        this.aspirantesNuevo = res['result']
      }
    })

  }

}
