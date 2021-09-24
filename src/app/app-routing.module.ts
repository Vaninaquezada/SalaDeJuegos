import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogueadoGuard } from './guards/logueado.guard';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { ErrorNoLogueadoComponent } from './pages/error-no-logueado/error-no-logueado.component';
import { HomeComponent } from './pages/home/home.component';
import { ListadosComponent } from './pages/listados/listados.component';
import { LoginComponent } from './pages/login/login.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quiensoy', component: QuienSoyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'error', component: ErrorNoLogueadoComponent },
  { path: 'encuesta', component: EncuestaComponent },
  { path: 'listados', component: ListadosComponent },
  { path: 'juegos', loadChildren: () => import('./juegos/juegos.module').then(m => m.JuegosModule), canActivate: [LogueadoGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
