import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab-inicio',
  templateUrl: './tab-inicio.page.html',
  styleUrls: ['./tab-inicio.page.scss'],
})
export class TabInicioPage implements OnInit {

  submenu: any[] = []
  descripcionConst = "Pagina principal"
  descripcion = ""

  constructor(
    private servicioData: DataService
  ) { }

  ngOnInit() {

    //console.log('@INICIO')

  }

  selectSubItem(item){
    this.submenu = this.servicioData.getSubMenu(item)
  }
  

  selectOpcion(item){
    //console.log(item)
    this.submenu.forEach(element => {
      element.activo = false
    });

    this.descripcion = item.descripcion
    item.activo = true
  }
  

  ionViewWillEnter  (){
    this.selectSubItem('inicio')
    this.descripcion = this.descripcionConst
    //console.log( this.descripcion )
  }


  ionViewWillLeave (){
    this.submenu = []
    // console.log('**EXIT', this.submenu)
  }


}
