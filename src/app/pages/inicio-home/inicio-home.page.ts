import { Component, OnInit } from '@angular/core';
import { FtpfilesService } from '../../services/ftpfiles.service';

@Component({
  selector: 'app-inicio-home',
  templateUrl: './inicio-home.page.html',
  styleUrls: ['./inicio-home.page.scss'],
})
export class InicioHomePage implements OnInit {

  filename: string = "";
  file: File = null;
  loading: boolean = false;

  constructor(

    private servicioFtp: FtpfilesService

  ) { }


  ngOnInit() {
    //this.servicioFtp.setArchivo('https://promine-ec.000webhostapp.com/imagenes')
  }


  onChange(event) {
    this.file = event.target.files[0];
  }


  onUpload() {
    this.loading = !this.loading;
    console.log(this.file);
    this.servicioFtp.setArchivo(this.file).subscribe(
      (event: any) => {
        if (typeof (event) === 'object') {

          // Short link via api response
          this.filename = event.link;

          this.loading = false; // Flag variable 
        }
      }
    );
  }


}
