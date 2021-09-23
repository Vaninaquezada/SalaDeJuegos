import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { JuegosComponent } from './juegos.component';
import { MayorOmenorComponent } from './mayor-omenor/mayor-omenor.component';
import { MijuegoComponent } from './mijuego/mijuego.component';

const routes: Routes = [
  {
    path: 'mayomenor',
    component: MayorOmenorComponent
  },
  {
    path: 'ahorcado',
    component: AhorcadoComponent
  },
  {
    path: '',
    component: JuegosComponent
  },
  {
    path: 'mijuego',
    component: MijuegoComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JuegosRoutingModule { }
