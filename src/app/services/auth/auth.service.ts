import { Injectable, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import auth from 'firebase/app'

import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import {Accounts, Bank, paymentDetails, Province, Roles, Supplier, User} from 'src/app/models/supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';
import { UserService } from '../users/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  newUser: any;
  confirmMessage:string = ''
  loginMessage: string = ''
  applicationStatus: boolean = true;
  registrationMessage: string =''
  userTypeCollection: AngularFirestoreCollection<Roles>;
  provinceCollection: AngularFirestoreCollection<Province>;
  bankTypeCollection: AngularFirestoreCollection<Accounts>
  bankNameCollection: AngularFirestoreCollection<Bank>;
  userState: any;
  loginStatus: boolean = true;
  userSignUpForm: FormGroup;
  constructor(
    private afAuth: AngularFireAuth,
    protected form: FormBuilder,
    private firestore: AngularFirestore,
    private route: Router,
    private ngZone: NgZone,
    private userServ: UserService
    ){
      this.userSignUpForm = this.userServ.userInformationForm()
      this.afAuth.authState.subscribe( user=>{
        if(user){
          this.userState = user;
          localStorage.setItem('user', JSON.stringify('user', this.userState));
          JSON.parse(localStorage.getItem('user') || '{}')
        }
        else{
          localStorage.setItem('user',String(null))
          JSON.parse(localStorage.getItem('user') || '{}')
        }
      })
      this.userTypeCollection = this.firestore.collection<Roles>('userType');
      this.bankNameCollection = this.firestore.collection<Bank>('bankName');
      this.bankTypeCollection = this.firestore.collection<Accounts>('bankType');
      this.provinceCollection = this.firestore.collection<Province>('provinces');
    }

    getProvinces(){
      return this.provinceCollection.snapshotChanges().pipe(
        map( actions =>  actions.map(
          e => {
            const id = e.payload.doc.id;
            const data = e.payload.doc.data() as Province;
            return {id, ...data};
          }
        ))
      );
    }
    getBankName(){
      return this.bankNameCollection.snapshotChanges().pipe(
        map( actions =>  actions.map(
          e => {

            const data = e.payload.doc.data() as Bank;
            const id = e.payload.doc.id
            return {...data};
          }
        ))
      );
    }
    getAccountType(){
      return this.bankTypeCollection.snapshotChanges().pipe(
        map( actions =>  actions.map(
          e => {
            const id = e.payload.doc.id;
            const data = e.payload.doc.data() as Accounts;
            return {id, ...data};
          }
        ))
      );;
    }
    getUserType(){
      return this.userTypeCollection.snapshotChanges().pipe(
        map( actions =>  actions.map(
          e => {
            const id = e.payload.doc.id;
            const data = e.payload.doc.data() as Roles;
            return { ...data};
          }
        ))
      );
    }
//Authentication and Authorization

signIn(){
  return this.afAuth.signInWithEmailAndPassword(this.userSignUpForm.controls.emailAddress.value, this.userSignUpForm.controls.password.value).then(
    (results)=> {
      this.ngZone.run(()=>{
        this.loginStatus = true;
        this.loginMessage = `Successfully logged in`
        this.route.navigate(['dashboard']);
      })
    }
  ).catch(error => {
    this.loginStatus = false;
    this.loginMessage = `Incorrect username or password`
    error.message;
  })
}

SignUp(email: string, password:string){
  return this.afAuth.createUserWithEmailAndPassword(email,password).then(
    result =>{
      this.ngZone.run(()=>{
        const id= result.user?.uid;

        this.firestore.collection<User>('users').doc(id).set(this.userSignUpForm.value);
        this.loginMessage = `User account created! Our administrator will audit the
        application in order to approve or decline the application`;
        console.log(this.loginMessage)
        this.route.navigate(['home']);
      })
    }
  ).catch(error =>{
    this.loginMessage = `User account could not be created`;
    console.log(error.message);
    this.route.navigate(['create-account'])
  })
}
  forgotPassword(email: string){
  return this.afAuth.sendPasswordResetEmail(email).then(
    ()=>{
      this.loginMessage = `Password reset email was sent to the email ${email}, check your inbox`
    }
  ).catch(
    (error)=>{
      this.loginMessage = `Password reset email could not be sent, please try again`
    }
  )
}
setUserData(user:any){
  const userRef: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.id}`);
  const userState: User ={
    id: user.id,
    emailAddress: user.emailAddress,
    fullName: user.fullName,
    phoneNo: user.phoneNo,
    roles: user.roles
  }
  return userRef.set(userState, {merge:true})
}
  get isLoggedIn():boolean{
  const user = JSON.parse(localStorage.getItem('user') || '{}')
  return (user !== null)? true : false;
  }
  logOut(){
      return this.afAuth.signOut().then(()=>{
        localStorage.removeItem('user');
        this.route.navigate(['sign-in'])
      })
  }

}
