import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { User } from 'src/app/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user: Observable<User> | undefined;
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private route: Router
    ){
      this.user = this.afAuth.authState.pipe(
        switchMap(user =>{
          if(user){
            return this.firestore.doc(`users/${user.uid}`)
          }
          else{
            return of(null)
          }
        })
      )
    }
}
