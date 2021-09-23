import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import firebase from "firebase/app";
import "firebase/database";
import { switchMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Lista } from '../clases/lista';
@Injectable({
  providedIn: 'root'
})
export class ListadoService {
  mail!: string | null;
  constructor(private afs: AngularFirestore, private authSvc: AuthService, private router: Router) {
    this.getUserMail();
  }


  addResultado(result: Lista) {
    this.getUserMail();
    let listas = [];

    return this.afs.collection('listados').add({
      usuario: this.mail,
      tiempo: result.tiempo,
      resultado: result.resultado,
      clicks: result.clicks,
      juego: result.juego,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  getListas() {
    this.getUserMail();
    let listas = [];
    this.getUserMail();
    return this.getListado().pipe(
      switchMap(res => {
        listas = res;
        return this.afs.collection('listados', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' }) as Observable<Lista[]>;
      }),
      /* 
       map(listas => {
         // Get the real name for each user
         for (let l of listas) {
           l.usuario = this.mail;
           l.myMsg = this.mail === l.usuario;
         }
         
         return listas
       })*/
    )

  }

  private getListado() {
    // return this.afs.collection('user').valueChanges({ idField: 'uid' }) as Observable<User[]>;
    return this.afs.collection('listados', ref => ref.orderBy('createdAt', 'desc')).valueChanges({ idField: 'id' }) as Observable<Lista[]>;

  }

  private async getUserMail() {
    if (await this.authSvc.getUsuario()) {
      this.mail = (await this.authSvc.getUsuario())!.email;
    } else {
      this.mail = "usuario anonimo";
    }

  }
}
