import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-principal-th',
  templateUrl: './principal-th.page.html',
  styleUrls: ['./principal-th.page.scss'],
})
export class PrincipalThPage implements OnInit {

  constructor(
    private dataService: DataService,

  ) { }

  ngOnInit() {
  }

  buscarAspirante(){
    this.dataService.getDatos().subscribe( res => {
      console.log(res['result'])
    })
  }

}
