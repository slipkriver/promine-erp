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

    const contenido = [];

    contenido.push(
      { text: 'FICHA DE INGRESO PERSONAL NUEVO', style: 'titulo', alignment: 'center', margin: [0, 60, 0, 0] },

      { text: 'INFORMACIÓN GENERAL', style: 'subtitulo', margin: [0, 10, 0, 5] },
      {
        table: {
          widths: [100, 100, 80, 100, 80],
          body: [
            //FILA #1
            [
              {
                rowSpan: 4,
                //text: 'FOTO',
                image: await this.getBase64ImageFromURL('assets/icon/no-person.png'),
                width: 100,
                height: 100,
                alignment: 'center',
                margin: [0, 0, 0, 0]
              },
              {
                text: [
                  { text: 'Nombre\n', style: 'titulocol' },
                  // { text: 'CAMPOVERDE SALDARREAGA ANGEL FABRICIO', style:'textonormal' },
                  { text: aspirante.asp_nombre, style:'textonormal' }
                ],
                colSpan: 3
              },
              {},
              {},
              {
                text: [
                  { text: 'Ced. Identidad\n', style: 'titulocol' },
                  //{ text: '0123456789-0', style:'textonormal' }
                  { text: aspirante.asp_cedula, style:'textonormal' }
                ]
              },
            ],
    
            //FILA #2
            [
              {},
              {
                text: [
                  { text: 'Nacionalidad\n', style: 'titulocol' },
                  { text: 'ECUATORIANA', style:'textonormal' }
                  //{ text: aspirante.asp_nacionalidad, bold:true }
                ]
              },
              {
                text: [
                  { text: 'Sexo\n', style: 'titulocol' },
                  { text: 'HOMBRE', style:'textonormal' }
                  //{ text: aspirante.asp_sexo, bold:true }
                ]
              },
              {
                text: [
                  { text: 'Edad\n', style: 'titulocol' },
                  { text: '42 AÑOS', style:'textonormal' }
                  //{ text: aspirante.asp_edad, bold:true }
                ]
              },
              {
                text: [
                  { text: 'Estado civil\n', style: 'titulocol' },
                  { text: 'SOLTERO', style:'textonormal' }
                  //{ text: aspirante.asp_civil, bold:true }
                ]
              }
            ],
    
            //FILA #3
            [
              {},
              {
                text: [
                  { text: 'Aspirante al cargo\n', style: 'titulocol' },
                  { text: 'OPR MINAS/LOCOMOTORA', style:'textonormal' }
                  //{ text: aspirante.asp_cargo },
                ],
                colSpan: 2
              },
              {},
              {
                text: [
                  { text: 'Cod. Sectorial\n', style: 'titulocol' },
                  { text: '0430000000036', style:'textonormal' }
                  //{ text: aspirante.asp_etnia }
                ],
              },
              {
                text: [
                  { text: 'Sueldo\n', style: 'titulocol' },
                  { text: '$500.00', style:'textonormal' }
                  //{ text: aspirante.asp_instruccion }
                ],
              }
            ],
    
            //FILA #4
            [
              {},
              {
                text: [
                  { text: 'Experiencia\n', style: 'titulocol' },
                  { text: 'SI', alignment: 'center', style:'textonormal' }
                  //{ text: vproductores[i].prod_tel1 },
                ]
              },
              {
                text: [
                  //{ text: '\n', style: 'titulocol' },
                  { text: 'OPERADOR DE MAQUINARIA EN EL MINISTERIO DE OBRAS PUBLICAS', italics: true, fontSize:11 }
                  //{ text: vproductores[i].prod_correo, fontSize: 10 }
                ],
                colSpan: 3
              },
              {}
            ],
    
            //FILA #5
            [
              {
                text: [
                  { text: 'Fecha entrevista\n', style: 'titulocol' },
                  { text: '20-06-2022, 14:45', style:'textonormal' }
                  //{ text: vproductores[i].prod_discapacidad }
                ]
              },
              {
                text: [
                  { text: 'Fecha ingreso\n', style: 'titulocol' },
                  { text: '23-06-2022', style:'textonormal' }
                  //{ text: vproductores[i].prod_ndiscapacidad }
                ],
              },
              {
                text: [
                  { text: 'Referencia personal\n', style: 'titulocol' },
                  { text: 'ING. NANCY PASTOR', style:'textonormal' }
                  //{ text: vproductores[i].prod_pdiscapacidad }
                ],
                colSpan: 2
              },
              {},
              {
                text: [
                  { text: 'GRUPO\n', style: 'titulocol' },
                  { text: 'ADMIN', style:'textonormal' }
                ],
              },
            ],
    
            //FILA #6
            [
              {
                text: [
                  { text: 'CONADIS\n', style: 'titulocol' },
                  { text: '1122334455', style:'textonormal' }
                  //{ text: vproductores[i].prod_discapacidad }
                ],
              },
              {
                text: [
                  { text: 'Nombre discapacidad\n', style: 'titulocol' },
                  { text: 'ANDA MEDIO CIEGO', style:'textonormal' }
                  //{ text: vproductores[i].prod_ndiscapacidad }
                ],
                colSpan: 3
              },
              {}, {},
              {
                text: [
                  { text: '(%)Discapacidad\n', style: 'titulocol' },
                  { text: '64%', style:'textonormal' }
                  //{ text: vproductores[i].prod_pdiscapacidad }
                ],
              },
            ],
    
            //FILA #7
            [
              {
                text: [
                  { text: 'Tipo sangre\n', style: 'titulocol' },
                  { text: 'O+', alignment: 'center', style:'textonormal' }
                ],
              },
              {
                text: [
                  { text: 'Direccion de domicilio\n', style: 'titulocol' },
                  { text: 'BELLAVISTA - EL GUABO', italics: true, fontSize: 11 }
                ],
                colSpan: 3,
                rowSpan: 2,
              },
              {}, {}, 
              {
                text: [
                  { text: 'Aprobado\n', style: 'titulocol' },
                  { text: 'SI', alignment: 'center', style:'textonormal' }
                ],
              },
            ],
    
            //FILA #8
            [
              {
                text: [
                  { text: 'Telefono\n', style: 'titulocol' },
                  { text: '0994557871', style:'textonormal' }
                ],
              },
              {},
              {}, {}, {}
            ]
          ]
        }

      },
      //salto
    )

    let esquemaDoc = {

      header: {

        image: await this.getBase64ImageFromURL('assets/icon/membrete.jpg'),
        width: 600,
        //height: 30,
        margin: [0, 10, 0, 0],
        alignment: 'center'
      },


      content: [

        contenido,


      ],

      styles: {
        titulo: {
          fontSize: 15,
          bold: true,
          color: '#3742b8',
        },
        subtitulo: {
          fontSize: 12,
          bold: true,
          //background:'#000000'
        },
        titulocol: {
          fontSize: 9,
          //bold: true,
        },
        textonormal: {
          fontSize: 11,
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
