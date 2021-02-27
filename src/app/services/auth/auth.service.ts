import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Supplier } from 'src/app/models/supplier';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private afAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private route: Router
    ){}
}
