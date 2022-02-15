import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class FtpfilesService {

  baseApiUrl: string = "http://promine-ec.000webhostapp.com/imagenes";
  //baseApiUrl: string = "https://files.000webhost.com/images";


  constructor(

    private http:HttpClient

  ) { }


  setArchivo(file):Observable<any>{
    
          // Create form data
          const formData = new FormData(); 
        
          // Store form name as "file" with file data
          formData.append("file", file, file.name);
            
          // Make http post request over api
          // with formData as req
          //console.log(formData)
          return this.http.post(this.baseApiUrl, formData)


  }

}
