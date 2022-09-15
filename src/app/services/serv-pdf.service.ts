import { Injectable } from '@angular/core';
import { setPlatform } from '@capacitor/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from "pdfmake/build/vfs_fonts";
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ServPdfService {

  pdfObj = null;

  constructor() { }


  async getPdfFichaingreso(aspirante?) {

    let salto: any = { text: '', pageBreak: 'after' };

    const encabezado = [];
    const contenido = [];

    contenido.push(
      { text: 'FICHA DE INGRESO PERSONAL NUEVO', style: 'titulo', alignment: 'center', margin: [0, 60, 0, 0] },

      { text: 'INFORMACIÓN GENERAL', style: 'subtitulo', margin: [5, 10, 0, 5] },
      {
        table: {
          widths: [100, 100, 80, 100, 80],
          body: [
            //FILA #1
            [
              {
                rowSpan: 4,
                image: await this.getBase64ImageFromURL('assets/icon/person.png'),
                width: 100,
                height: 100
              },
              {
                text: [
                  { text: 'codigo productor\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_codigo, style: 'subtitulo' }
                ]
              },
              {
                text: [
                  { text: 'cedula identidad\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_cedula }
                ]
              },
              {
                text: [
                  { text: 'genero\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_genero }
                ]
              },
              {
                text: [
                  { text: 'estado civil\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_civil }
                ]
              }
            ],

            //FILA #2
            [
              {},
              {
                text: [
                  { text: 'nombres\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_nombres },
                ],
                colSpan: 2
              },
              {},
              {
                text: [
                  { text: 'apellidos\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_apellidop + ' ' + vproductores[i].prod_apellidom }
                ],
                colSpan: 2
              },
              {}
            ],

            //FILA #3
            [
              {},
              {
                text: [
                  { text: 'fecha nacimiento\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_fnacimiento },
                ]
              },
              {
                text: [
                  { text: 'etnia\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_etnia }
                ],
              },
              {
                text: [
                  { text: 'instruccion academica\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_instruccion }
                ],
                colSpan: 2
              },
              {}
            ],

            //FILA #4
            [
              {},
              {
                text: [
                  { text: 'telefono principal\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_tel1 },
                ]
              },
              {
                text: [
                  { text: 'telefono 2\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_tel2 }
                ],
              },
              {
                text: [
                  { text: 'correo electronico\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_correo, fontSize: 10 }
                ],
                colSpan: 2
              },
              {}
            ],

            //FILA #5
            [
              {
                text: [
                  { text: 'discapacidad\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_discapacidad }
                ],
              },
              {
                text: [
                  { text: 'nombre discapacidad\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_ndiscapacidad }
                ],
                colSpan: 3
              },
              {}, {},
              {
                text: [
                  { text: '% discapacidad\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_pdiscapacidad }
                ],
              },
            ],

            //FILA #6
            [
              {
                text: [
                  { text: 'idiomas que habla\n', style: 'titulocol' },
                  //{ text: vproductores[i].prod_idioma }
                ],
                colSpan: 5
              },
              {}, {}, {}, {}
            ]
          ]
        }
      },

      salto)

    let esquemaDoc = {

      header: {

            image: await this.getBase64ImageFromURL('assets/icon/membrete.jpg'),
            width: 600,
            //height: 30,
            margin: [0,10,0,0],
            alignment: 'center'
      },


      content: [

        contenido,


      ],

      styles: {
        titulo: {
          fontSize: 16,
          bold: true,
        },
        subtitulo: {
          fontSize: 14,
          bold: true,
        },
        negrita1: {
          fontSize: 12,
          bold: true,
        },
        titulocol: {
          fontSize: 10,
          bold: true,
        },
        contenido: {
          margin: [0, 10, 0, 15],
        }
      }
    }

    this.pdfObj = pdfMake.createPdf(esquemaDoc)

    this.pdfObj.download()

  }

  async getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute("crossOrigin", "anonymous");
      //img.setAttribute("Access-Control-Allow-Origin", '*');
      img.onload = () => {
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        var dataURL = canvas.toDataURL("image/jpeg");
        resolve(dataURL)
      };
      img.onerror = error => {
        reject(error);
      };
      img.src = url;
    });
  }


}
