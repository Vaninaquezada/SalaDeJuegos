import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-juegos',
  templateUrl: './juegos.component.html',
  styleUrls: ['./juegos.component.css']
})
export class JuegosComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  irMijuego() {
    this.router.navigate(['/juegos/mijuego']);
  }
  irMayorMenor() {
    this.router.navigate(['/juegos/mayomenor']);
  }
  irAhorcado() {
    this.router.navigate(['/juegos/ahorcado']);
  }
  irPreguntados() {
    this.router.navigate(['/juegos/preguntados']);
  }


}
