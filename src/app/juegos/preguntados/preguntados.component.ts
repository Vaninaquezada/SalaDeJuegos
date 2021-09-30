import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ListadoService } from 'src/app/services/listado.service';
import { ImagenService } from 'src/app/services/imagen.service';


@Component({
  selector: 'app-preguntados',
  templateUrl: './preguntados.component.html',
  styleUrls: ['./preguntados.component.css']
})
export class PreguntadosComponent implements OnInit {
  imagen: string;
  cantPreguntas: number;
  estiloImagen: {};
  pregunta: any;
  respuesta4: string;
  respuesta3: string;
  respuesta2: string;
  respuesta1: string;
  npreguntas: any = [];
  erradas: number;
  preguntas_hechas = 0;
  preguntas_correctas = 0;
  suspender_botones = false;
  base_preguntas: any;
  interprete_bp: any;
  estilo1: string;
  estilo2: string;
  estilo3: string;
  estilo4: string;
  categoria: string;
  preguntaActual: string;

  numero: any;
  puntaje: any;
  yellowd = 'yellow';
  posibles_respuestas: any;
  estilos: [any, any, any, any];
  btn_correspondiente: [string, string, string, string];
  victoria = '';
  start = 'visible';
  perdiste = '';
  resultadoText = '';
  resultado = {};
  img: any[] = []
  im: any;
  constructor(private httpClient: HttpClient, private listado: ListadoService, private svcImg: ImagenService) {
    this.httpClient.get("assets/json/preguntas.json").subscribe(data => {
      this.interprete_bp = data;
    })
    this.svcImg.getImg().subscribe((data) => {
      this.im = data;
      //   console.log("imagenes " + JSON.stringify(data));
      // console.log("imagenes " + );
      //  this.img.push(this.im.hits);


      this.getImg(this.im.hits);

    });
    this.imagen = '';
    this.respuesta1 = '';
    this.respuesta2 = '';
    this.respuesta3 = '';
    this.respuesta4 = '';
    this.estilo1 = '';
    this.estilo2 = '';
    this.cantPreguntas = 1;
    this.estilo3 = '';
    this.estilo4 = '';
    this.pregunta = '';
    this.erradas = 0;
    this.categoria = '';
    this.preguntaActual = '';
    this.numero = '';
    this.estiloImagen = '';
    this.estilos = [this.estilo1, this.estilo2, this.estilo3, this.estilo4];
    this.posibles_respuestas = [];
    this.btn_correspondiente = [
      this.respuesta4, this.respuesta1,
      this.respuesta2, this.respuesta3
    ]

    setTimeout(() => {

      this.escogerPreguntaAleatoria()
    }, 300);
  }

  ngOnInit(): void {


  }

  desordenarRespuestas(pregunta: any) {
    this.posibles_respuestas = [
      pregunta.respuesta,
      pregunta.incorrecta1,
      pregunta.incorrecta2,
      pregunta.incorrecta3
    ]
    this.posibles_respuestas.sort(() => Math.random() - 0.5)

    this.respuesta1 = this.posibles_respuestas[0];
    this.respuesta2 = this.posibles_respuestas[1];
    this.respuesta3 = this.posibles_respuestas[2];
    this.respuesta4 = this.posibles_respuestas[3];
  }

  reiniciar() {
    this.cantPreguntas++;
    this.suspender_botones = false;
    for (let index = 0; index < this.estilos.length; index++) {
      this.estilos[index] = 'white';;

    }
    if (this.cantPreguntas > 5) {
      this.ckeckJuego();

    } else {
      this.escogerPreguntaAleatoria()
    }

  }


  escogerPreguntaAleatoria() {
    let n = Math.floor(Math.random() * this.interprete_bp.length)
    // n = 0

    while (this.npreguntas.includes(n)) {
      n++;
      if (n >= this.interprete_bp.length) {
        n = 0;
      }
      if (this.npreguntas.length === this.interprete_bp.length) {
        this.npreguntas = []
      }
    }
    this.npreguntas.push(n)
    this.preguntas_hechas++

    this.escogerPregunta(n)
  }


  oprimir_btn(i: number) {

    if (this.suspender_botones) {
      return
    }

    this.suspender_botones = true;
    if (this.posibles_respuestas[i] == this.pregunta.respuesta) {
      this.preguntas_correctas++;
      this.estilos[i] = 'lightgreen';
    } else {
      this.estilos[i] = 'pink';
      this.erradas++;
    }
    for (let j = 0; j < 4; j++) {
      if (this.posibles_respuestas[j] == this.pregunta.respuesta) {
        this.estilos[j] = 'lightgreen';
        break
      }
    }
    /*  setTimeout(() => {
        this.reiniciar()
        this.suspender_botones = false;
      }, 3000);
      */
  }

  escogerPregunta(n: any) {
    this.pregunta = this.interprete_bp[n];
    this.categoria = this.pregunta.categoria;
    this.preguntaActual = this.pregunta.pregunta;

    console.log("url " + this.imagen);
    this.numero = n;
    let pc = this.preguntas_correctas;
    if (this.preguntas_hechas > 1) {

      this.puntaje = pc + "/" + (this.preguntas_hechas - 1);

    } else {
      this.puntaje = "";
    }
    this.desordenarRespuestas(this.pregunta)
    if (this.pregunta.imagen) {
      this.imagen = this.pregunta.imagen;
      this.estiloImagen = { "height": '200px', "width": '100%' };

    } else {
      this.imagen = this.img[n].largeImageURL;
      //   this.estiloImagen = { "height": '0px', "width": '0px' };
      this.estiloImagen = { "height": '200px', "width": '100%' };

      /*   setTimeout(() => {
           this.imagen = "";
         }, 500);
         */
    }

  }

  ckeckJuego() {

    if (this.erradas > 2) {
      this.perdiste = "visible";
      this.resultadoText = 'Perdiste';
    } else {
      this.resultadoText = 'Ganaste';
      this.victoria = "visible";
    }
    this.resultado = {
      "tiempo": "N/A",
      "resultado": this.resultadoText,
      "errores": this.erradas,
      "clicks": "N/A",
      "correctas": this.preguntas_correctas,
      "juego": "Preguntados",
    }
    this.listado.addResultado(this.resultado);

  }
  clickBoton() {
    this.cantPreguntas = 0;
    this.reiniciar();
    this.puntaje = '';
    this.numero = '';
    this.erradas = 0;
    this.perdiste = "";
    this.victoria = "";
    this.start = '';
  }
  async getImg(imagen: any) {
    this.img = imagen;
  }
}
