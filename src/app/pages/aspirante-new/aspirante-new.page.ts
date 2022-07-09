import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, NavController } from '@ionic/angular';
import { concat } from 'rxjs';
import { DataService } from 'src/app/services/data.service';

import { AspiranteInfo } from '../../interfaces/aspirante';
import { EmpleadoInfo } from '../../interfaces/empleado';

@Component({
  selector: 'app-aspirante-new',
  templateUrl: './aspirante-new.page.html',
  styleUrls: ['./aspirante-new.page.scss'],
})
export class AspiranteNewPage implements OnInit {

  aspirante = <AspiranteInfo>{}
  empleado = <EmpleadoInfo>{}
  aspirantecodigo = "nuevo"

  fechaEntrevista: Date = new Date();
  fechaIngreso: Date = new Date();
  fechaDepartamento: Date = new Date();

  conadis: boolean = true;
  experiencia: boolean = true;
  estado: any[] = [];
  departamentos: any[] = [];
  paises: any[] = [];
  sexo: any[] = [];
  civil: any[] = [];
  tipo_sangre: any[] = [];
  cargo: any[] = [];
  referencia: any[] = [];

  infogeneral: boolean = true;
  infoubicacion: boolean = true;
  mensajecedula: string = '';
  ci_valida: boolean = true;
  soloLectura: boolean = true

  listas = ['estado', 'paises', 'sexo', 'civil', 'tipo_sangre', 'cargo', 'referencia']

  mdFechaEntrevista = false

  constructor(
    private dataService: DataService,
    private loadingCtrl: LoadingController,
    public navCtrl: NavController,
    private actRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.listas.forEach(element => {

      this.dataService.getAspiranteLData(element).subscribe(lista => {
        this[element] = lista;
        //console.log(this.estado);
      });

    });


    this.dataService.getEmpleadoLData('departamento').subscribe(departamentos => {
      this.departamentos = departamentos;
    });

    this.actRoute.params.subscribe((data: any) => {
      console.log(data)

      if (data['asp_cedula']) {
        this.aspirante = this.dataService.aspirante
        this.aspirantecodigo = data.asp_codigo
      } else {
        this.aspirante = <AspiranteInfo>{}
        this.aspirante = this.dataService.newObjAspirante(this.aspirante)

      }
      
      //const srtfecha = this.fechaEntrevista.toUTCString()
      //let fecha = this.fechaEntrevista.toISOString()
      //const str = this.fechaEntrevista.toJSON()   
      
      //var fechaTest: Date = new Date(srtfecha);
      console.log(this.fechaEntrevista)

      //var fechaTest: Date = new Date("2022-08-25 15:30:00Z");
      //fechaTest.valueOf()
      //this.fechaEntrevista = new Date()
      // let items = fecha.split(', ')
      // var nfecha = items[0].trim()
      // const nHora = items[1].trim()
      // items = nfecha.split('/')
      //nfecha = items[2].toString()+'-'+items[1].toString()+'-'+items[0].toString()
      //const str = nfecha.concat(', ', nHora,'Z')
      //this.fechaEntrevista.setUTCHours(-5)
      //this.fechaEntrevista = new Date(fechaTest)
      //this.aspirante.asp_fch_ingreso = new Date (srtfecha).toUTCString()

      //console.log(fechaTest.toUTCString(),'*',fechaTest.toISOString(),
                //'$',fechaTest.toTimeString(),'#',this.aspirante.asp_fch_ingreso,'>>',fecha,'<<>>',this.fechaEntrevista.toDateString())//,'**',fechaTest.toISOString(),'<>',fechaTest.toUTCString())

    })

  }//2022-07-08T20:06:38

  mostrarContenido(contenido) {

    this[contenido] = (this[contenido]) ? false : true

  }


  verificarci(evento) {
    var cedula: string = evento.detail.value

    if (cedula.length == 10) {
      var d10 = cedula[9]
      if (parseInt(d10) == this.getDigitoV(cedula)) {
        this.mensajecedula = 'si'
        this.ci_valida = true
      }
      else {
        this.mensajecedula = 'no'
        this.ci_valida = false
      }
    }
    else
      this.mensajecedula = ''

    //console.log(this.ci_valida)
  }

  getDigitoV(cedula) {
    var x = 0, spar = 0, simp = 0;
    var flag: Boolean = true

    for (let i = 0; i < 9; i++) {
      if (flag) {
        x = parseInt(cedula[i]);
        x *= 2;
        if (x > 9)
          x -= 9;
        simp += x;
        flag = false
      }
      else {
        x = parseInt(cedula[i]);
        spar += x;
        flag = true
      }
    }
    var decenaInt = (Math.trunc((spar + simp) / 10) + 1) * 10;
    decenaInt -= (spar + simp);
    //console.log(decenaInt)
    return (decenaInt == 10) ? 0 : decenaInt;
  }


  abrirFechaEsntrevista() {
    if (this.mdFechaEntrevista == true) {
      this.mdFechaEntrevista = false
    } else {
      this.mdFechaEntrevista = true
     }
  }


  setFecha(evento) {
    //console.log(evento.detail.value);
    const fecha = evento.detail.value.toString()
    var fechaTest= new Date(fecha.substring(0, 21)+"0:00");
    this.fechaEntrevista = fechaTest
    this.aspirante.asp_fch_ingreso = fechaTest.toUTCString().substring(0,22)
    //this.fechaEntrevista = new Date(evento.detail.value.toLocaleString());
    
  }


  async onSubmitTemplate() {
    this.aspirante.asp_estado = 'INGRESADO'

    const loading = await this.loadingCtrl.create({
      message: '<b>Guardando información... <b><br>Espere por favor',
      translucent: true,
      duration: 1000,
    });
    loading.present()

    this.aspirante.asp_fch_ingreso = this.fechaEntrevista.toISOString().substring(0,19).replace('T',' ')
    this.aspirante.atv_aspirante = this.aspirante.asp_cedula
    this.aspirante.atv_fingreso = this.aspirante.asp_fch_ingreso

    this.dataService.nuevoAspirante(this.aspirante).subscribe(res => {

      //console.log(this.aspirante, res)

    })


  }

  async onSubmitUpdate() {
    const loading = await this.loadingCtrl.create({
      message: '<b>Guardando información... <b><br>Espere por favor',
      translucent: true,
      duration: 2000,
    });
    loading.present()

    //console.log(this.aspirante)

    this.aspirante.atv_aspirante = this.aspirante.asp_cedula

    this.dataService.updateAspirante(this.aspirante).subscribe(res => {
      console.log(res)

    })


  }

  actualizarvalor(evento, variable) {
    if (evento.detail.checked == false) {
      this.aspirante[variable] = 'NO'
      this[variable] = false
    }
    else
      this.aspirante[variable] = 'SI'
    this[variable] = true
    //console.log(this.productor[variable], ' -> ', variable)
  }


  activarFormulario() {
    if (!this.soloLectura) {
      return
    }
    this.soloLectura = (this.soloLectura) ? false : true
  }

  cancelarSolicitud() {
    this.navCtrl.navigateBack(['/inicio']);

  }


}
