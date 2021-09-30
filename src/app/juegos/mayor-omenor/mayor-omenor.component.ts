import { Component, OnInit } from '@angular/core';
import { ListadoService } from 'src/app/services/listado.service';
import { JuegosComponent } from '../juegos.component';

@Component({
  selector: 'app-mayor-omenor',
  templateUrl: './mayor-omenor.component.html',
  styleUrls: ['./mayor-omenor.component.css']
})
export class MayorOmenorComponent implements OnInit {
  numero = 0;
  numeroNuevo: any = '?';
  numeroActual = 0;
  incorrectas = 0;
  correctas = 0;
  repondidas = 0;
  jugando = false;
  resultadoText = '';
  resultado = {};
  victoria = '';
  start = 'visible';
  perdiste = '';
  mensaje = '';
  constructor(private listado: ListadoService,) { }

  ngOnInit(): void {
  }

  verificar(seleccion: any) {
    if (this.numeroNuevo === '?') {
      this.numeroNuevo = this.generarnumero();
    }
    this.repondidas++;
    if (this.repondidas === 5) {
      this.jugando = false;
      this.terminarjugo();
    }
    if (seleccion === 'mayor') {
      if (this.numeroActual > this.numeroNuevo) {
        this.correctas++;
        this.mensaje = 'Correcto ' + this.numeroActual + ' es mayor que ' + this.numeroNuevo;
      } else {
        this.incorrectas++;
        this.mensaje = 'Incorrecto ' + this.numeroActual + ' es menor que ' + this.numeroNuevo;
      }
    }
    if (seleccion === 'menor') {
      if (this.numeroActual < this.numeroNuevo) {
        this.correctas++;
        this.mensaje = 'Correcto ' + this.numeroActual + ' es menor que ' + this.numeroNuevo;
      } else {
        this.incorrectas++;
        this.mensaje = 'Correcto ' + this.numeroActual + ' es mayor que ' + this.numeroNuevo;
      }
    }
    this.numeroActual = this.numeroNuevo;
    this.numero = this.generarnumero();
    while (this.numero === this.numeroActual) {
      this.numero = this.generarnumero();
    }
    this.numeroNuevo = this.numero;

  }
  public generarnumero() {
    return Math.floor((Math.random() * 12) + 1);
  }

  terminarjugo() {

    if (this.incorrectas > 2 && this.jugando) {
      this.victoria = "visible";
      this.resultadoText = 'Perdiste';
    } else {
      this.resultadoText = 'Ganaste';
      this.victoria = "visible";
    }
    this.resultado = {
      "tiempo": "N/A",
      "resultado": this.resultadoText,
      "errores": this.incorrectas,
      "clicks": "N/A",
      "correctas": this.correctas,
      "juego": "Mayor o Menor",
    }
    this.listado.addResultado(this.resultado);

    this.numero = 0;
    this.numeroNuevo = 0;
    this.numeroActual = 0;

  }


  clickBoton() {
    this.jugando = true;

    this.numero = 0;
    this.start = '';
    this.numeroNuevo = '?';
    this.numeroActual = 0;
    this.incorrectas = 0;
    this.correctas = 0;
    this.repondidas = 0;
    this.perdiste = '';
    this.resultadoText = '';
    this.resultadoText = '';
    this.victoria = '';
    //this.numero = this.generarnumero();

    this.numeroActual = this.generarnumero();
  }
}
