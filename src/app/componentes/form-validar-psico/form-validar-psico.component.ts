import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-validar-psico',
  templateUrl: './form-validar-psico.component.html',
  styleUrls: ['./form-validar-psico.component.scss'],
})
export class FormValidarPsicoComponent implements OnInit {

  @Input("aspirante") aspirante;
  validado = false
  
  constructor() { }

  ngOnInit() {

    //console.log(this.aspirante)
    
  }

  ionViewDidEnter() {

    console.log(this.aspirante)
  }

}
