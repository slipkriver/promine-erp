import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-principal-th',
  templateUrl: './principal-th.page.html',
  styleUrls: ['./principal-th.page.scss'],
})
export class PrincipalThPage implements OnInit {

  aspirantesNuevo = []
  estados = []

  listaTareas = []
  textobusqueda=""

  constructor(
    private dataService: DataService,
    private actionSheetCtr: ActionSheetController,
    private router: Router,

  ) { }

  ngOnInit() {

    this.dataService.getAspiranteLData("estado").subscribe(lista => {
      this.estados = lista;
      //console.log(this.estados[10]);
    });

    // setTimeout(() => {
    this.listarAspirantes(0)
    // }, 2000);

  }

  buscarAspirante(event) {

    if (event.detail.value.length < 3) return

    this.dataService.getListanuevos(event.detail.value).subscribe(res => {
      //console.log(res['result'])
      if (res['result'] && res['result'].length > 0) {
        this.aspirantesNuevo = res['result']
      }
    })

  }

  listarAspirantes(id){

    this.dataService.listarPorEstado(id).subscribe(res => {
      //console.log( res )
      this.listaTareas = res['result']

    })


  }

  async opcionesTarea(aspirante){

    //var strTitulo = aspirante.asp_cedula + '::' 
    var strTitulo = aspirante.asp_apellidop + " " + aspirante.asp_apellidom + " " + aspirante.asp_nombres
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Ver ficha de ingreso ',
          icon: 'create',
          handler: () => {

            this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
              //console.log( res )
              this.dataService.aspirante = res['result'][0];
              this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])
  
            })
            //console.log('/pages/aspirante-new/' + aspirante['asp_cedula']);
          },
        },
        {
          text: 'Detalles del proceso',
          icon: 'information-circle',
          handler: () => {
            console.log('Play clicked');
          },
        },
        {
          text: 'Descargar ficha en PDF',
          icon: 'cloud-download',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Cancelar',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    await opciones.present();

    const { role } = await opciones.onDidDismiss();
    //console.log('onDidDismiss resolved with role', role);

  }

  borrarBusqueda(){
    this.textobusqueda=""
    this.aspirantesNuevo=[]
    console.log(this.aspirantesNuevo)
  }

}
