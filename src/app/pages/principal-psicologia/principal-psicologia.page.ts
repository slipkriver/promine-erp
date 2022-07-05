import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ActionSheetController, ModalController } from '@ionic/angular';
import { FormValidarPsicoComponent } from '../../componentes/form-validar-psico/form-validar-psico.component';

@Component({
  selector: 'app-principal-psicologia',
  templateUrl: './principal-psicologia.page.html',
  styleUrls: ['./principal-psicologia.page.scss'],
})
export class PrincipalPsicologiaPage implements OnInit {

  estado
  listaTareas = []
  aspirantesBuscar = []


  constructor(
    private actionSheetCtr: ActionSheetController,
    private dataService: DataService,
    public modalController: ModalController

  ) { }

  ngOnInit() {

    this.dataService.getAspiranteLData("estado").subscribe(lista => {
      //this.estados = lista;
      this.estado = 'VERIFICADO';
      //console.log(this.estados[10]);
    });

  }

  ionViewDidEnter() {
    this.listarAspirantes({ detail: { value: 2 } })
    //console.log(this.aspirantesNuevo)

    //this.validado = this.aspirante.atv_verificado
  }

  listarAspirantes(event) {

    this.listaTareas = []
    const id = event.detail.value
    //this.estado = this.estados[id]
    //console.log(event, id, parseInt(id))
    this.dataService.listarPorEstado(id).subscribe(res => {
      this.listaTareas = res['result']
      //console.log(res)

    })

  }

  async opcionesTarea(aspirante) {

    this.dataService.getAspRole(aspirante['asp_cedula'],'psico').subscribe(res => {

    })

    //var strTitulo = aspirante.asp_cedula + '::' 
    var strTitulo = aspirante.asp_apellidop + " " + aspirante.asp_apellidom + " " + aspirante.asp_nombres
    const opciones = await this.actionSheetCtr.create({
      header: strTitulo,
      cssClass: '',
      buttons: [
        {
          text: 'Ver informacion del apirante ',
          icon: 'create',
          handler: () => {

            this.dataService.getAspirante(aspirante['asp_cedula']).subscribe(res => {
              console.log(res)
              this.dataService.aspirante = res['result'][0];
              //this.router.navigate(['/inicio/tab-aspirante/aspirante-new/' + aspirante['asp_cedula']])

            })
            //console.log('/pages/aspirante-new/' + aspirante['asp_cedula']);
          },
        },
        {
          text: 'Verificar pruebas psicosometricas',
          icon: 'checkmark-circle',
          handler: async () => {
            setTimeout(() => {

              this.abrirFormpsico()

            }, 1000);
            //console.log('Play clicked');
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

  async abrirFormpsico() {
    const modal = await this.modalController.create({
      component: FormValidarPsicoComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        'aspirante': this.dataService.aspirante
      }
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (!data || data == undefined || data.role == "cancelar") {
      return;
    }
    //console.log(data);
    // if (data.length>0) {
    data.aspirante.task = "actualizar"
    
    //this.dataService.verifyTalento(data.aspirante).subscribe(res => {
      //console.log(res)
    //})

    // }
  }

}
