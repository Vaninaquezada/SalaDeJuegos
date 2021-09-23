import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { HomeComponent } from './pages/home/home.component';
import { QuienSoyComponent } from './pages/quien-soy/quien-soy.component';
import { MenuComponent } from './componentes/menu/menu.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularFireAuthModule } from '@angular/fire/auth'
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ChatComponent } from './componentes/chat/chat.component';
import { JuegosModule } from './juegos/juegos.module';
import { HttpClientModule } from '@angular/common/http';
import { MijuegoComponent } from './juegos/mijuego/mijuego.component';
import { AhorcadoComponent } from './juegos/ahorcado/ahorcado.component';
import { MayorOmenorComponent } from './juegos/mayor-omenor/mayor-omenor.component';
import { ErrorNoLogueadoComponent } from './pages/error-no-logueado/error-no-logueado.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    HomeComponent,
    QuienSoyComponent,
    MenuComponent,
    ChatComponent,
    MijuegoComponent,
    MayorOmenorComponent,
    AhorcadoComponent,
    ErrorNoLogueadoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    RouterModule,
    JuegosModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  exports: [MenuComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
