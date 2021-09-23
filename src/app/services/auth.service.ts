import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { filter, first, switchMap } from 'rxjs/operators';
import firebase from 'firebase/app';
//import User from "firebase"
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore'
import { Observable, of } from 'rxjs';
import { User } from '../clases/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //public user : firebase.User;
  public user$: Observable<any>;

  constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();

        }
        return of(null);
      })
    );
  }

  async login(email: string, password: string) {

    /*    return this.afAuth.signInWithEmailAndPassword(
          email,
          password
        );
        */
    //   try {
    return this.afAuth.signInWithEmailAndPassword(
      email,
      password
    );
    //   console.log("sericio user" + user);


    /* } catch (error) {
       console.log("sericio" + error);
       return error;
     }
 */
  }


  async registro(email: string, password: string) {
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log(error);
    }

  }
  getUsuario() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
  private updateUserData(user: any) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`user/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      myCustomData: "lola"
    };

    return userRef.set(data, { merge: true });
  }

  updateLogUser(email: string) {
    return this.afs.collection('userlog').add({
      email: email,
      fechaIngreso: firebase.firestore.FieldValue.serverTimestamp()
    });
  }

}
