import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-tab-aspirante',
  templateUrl: './tab-aspirante.page.html',
  styleUrls: ['./tab-aspirante.page.scss'],
})
export class TabAspirantePage implements OnInit {

  submenu: any[] = []
  descripcionConst = "Seguimiento de aspirantes"
  descripcion = ""

  constructor(
    private servicioData: DataService
  ) { }

  ngOnInit() {

    //this.selectSubItem('aspirante')

  }

  selectSubItem(item) {
    this.submenu = this.servicioData.getSubMenu(item)
    //console.log( this.submenu)

  }


  selectOpcion(item) {
    //console.log(item)
    this.submenu.forEach(element => {
      element.activo = false
    });

    this.descripcion = item.descripcion
    item.activo = true
  }


  ionViewWillEnter() {
    this.selectSubItem('aspirante')
    this.descripcion = this.descripcionConst
    //console.log(this.descripcion)
  }


  ionViewWillLeave() {
    this.submenu = []
    // console.log('**EXIT', this.submenu)
  }


}
