import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  menu: any[] = []
  submenu: any[] = []

  constructor(
    private servicioData: DataService
  ) { }

  ngOnInit() {
    this.servicioData.getMenu().subscribe( (res: any[]) => {
      //console.log(res)
      this.menu = res
    })
  }

  selectItem(item){
    //console.log(item)
    this.selectSubItem(item.name)

    this.menu.forEach(element => {
      element.activo = false
    });
    item.activo = true


  }

  selectSubItem(item){
    this.submenu = this.servicioData.getSubMenu(item)
    //console.log( this.submenu)

    // this.menu.forEach(element => {
    //   element.activo = false
    // });
    // item.activo = true
  }

  ngAfterContentInit(){
    //this.selectSubItem('inicio')
    //console.log('START!!', this.submenu)
    this.servicioData.getDatos().subscribe( (res: any[]) => {
      
      //console.log(res['result'])
      
    })
  }

  cambiarTab(event) {
    //console.log(event)
  }

}
