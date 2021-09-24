import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ListadoService } from 'src/app/services/listado.service';

@Component({
  selector: 'app-listados',
  templateUrl: './listados.component.html',
  styleUrls: ['./listados.component.css']
})
export class ListadosComponent implements OnInit {

  lista: Observable<any[]>;
  constructor(private listado: ListadoService) {
    this.lista = this.listado.getListas();
    console.log(this.lista);
  }

  ngOnInit(): void {

  }

}
