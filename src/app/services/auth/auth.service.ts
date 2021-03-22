import { Injectable, NgZone } from '@angular/core';

import { Router } from '@angular/router';
import * as firebase from 'firebase/app';
import { AngularFireAuth} from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';

import { map, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

import { AccountInfo, Bank, Province, Roles, User } from 'src/app/models/supplier';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  confirmMessage:string = ''
  loginMessage: string = ''
  registrationMessage: string =''
  userInformation: FormGroup;
  userTypeCollection: AngularFirestoreCollection<Roles>;
  provinceCollection: AngularFirestoreCollection<Province>;
  bankTypeCollection: AngularFirestoreCollection<AccountInfo>
  bankNameCollection: AngularFirestoreCollection<Bank>;
  userState: any;
  loginStatus: boolean = true
  constructor(
    private afAuth: AngularFireAuth,
    protected form: FormBuilder,
    private firestore: AngularFirestore,
    private route: Router,
    private ngZone: NgZone
    ){

      this.afAuth.authState.subscribe( user=>{
        if(user){
          this.userState = user;
          localStorage.setItem('users', JSON.stringify('users', this.userState));
          JSON.parse(localStorage.getItem('users') || '{}')
        }
      })
      this.userInformation = this.userInformationForm();
      this.userTypeCollection = this.firestore.collection<Roles>('userType');
      this.bankNameCollection = this.firestore.collection<Bank>('bank');
      this.bankTypeCollection = this.firestore.collection<AccountInfo>('bankType');
      this.provinceCollection = this.firestore.collection<Province>('provinces');
    }
    userInformationForm(): FormGroup{
      return  this.form.group({
        userDetails: this.form.group({
          fullName: ['', [Validators.required]],
          phoneNo: ['', [Validators.required, Validators.pattern('')]],
          emailAddress: ['', [Validators.required, Validators.pattern('')]],
          userType: ['', Validators.required],
        }),
        farmDetails: this.form.group({
          farmName: ['',[Validators.required]],
          address: this.form.group({
            stAddress: ['', [Validators.required]],
            city: ['', [Validators.required]],
            provinces: ['', [Validators.required]],
            zipCode: ['', [Validators.required, Validators.pattern('')]]
          })
        }),
        accountDetails: this.form.group({
          accHolderName: ['', [Validators.required]],
          bankName: ['', [Validators.required]],
          accountNumber: ['', Validators.required],
          accountType: ['', [Validators.required]],
          branchCode: ['',[Validators.required, Validators.pattern('')]]
        })
      });
    }
    getProvinces(){
      return this.provinceCollection.snapshotChanges().pipe(
        map( actions =>  actions.map(
          e => {
            const data = e.payload.doc.data() as Province;
            return {...data};
          }
        ))
      );
    }
    getBankName(){
      return this.bankNameCollection.snapshotChanges().pipe(
        map( actions =>  actions.map(
          e => {
            const data = e.payload.doc.data() as Bank;
            return {...data};
          }
        ))
      );
    }
    getAccountType(){
      return this.bankTypeCollection.snapshotChanges().pipe(
        map( actions =>  actions.map(
          e => {
            const data = e.payload.doc.data() as AccountInfo;
            return {...data};
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
    registerWithEmailAndPassWord(email:string, password: string){
      return this.afAuth.createUserWithEmailAndPassword(email, password).then(
        (results)=>{
          this.setUserData(results.user as unknown as User)
      })
    }
    loginWithEmailAndPassWord(email:string, password:string){
      return this.afAuth.signInWithEmailAndPassword(email, password).then(
        results =>{
          this.ngZone.run(()=> {
            this.loginStatus = true;
            this.loginMessage = `Login was succefull, redirecting to dashboard...`
            this.route.navigate(['dashboard']);
          })
        }
      ).catch(error=>{
        this.loginStatus = false;
        this.loginMessage = `Incorrect email address or password`
        console.log(error.message);
        this.route.navigate(['sign-in']);
      })
    }
    setUserData(user: User){
      const userDocument: AngularFirestoreDocument<User> = this.firestore.doc(`users/${user.id}`);
      const userState: User = {
        id: user.id,
        fullName: user.fullName,
        emailAddress: user.emailAddress,
        phoneNo: user.phoneNo,
        roles: user.roles
      }
      return userDocument.set(userState, {
        merge: true
      })
    }
    ForgotPassword(emailAddress: string){
      return this.afAuth.sendPasswordResetEmail(emailAddress).then(
        ()=> {
          this.confirmMessage = `Password reset link was sent to ${emailAddress}, check your inbox`;
        }
      ).catch(()=>{
        this.confirmMessage =  `Password reset link could not be fowarded to ${emailAddress},
        check if the email is correct and try again`;
      })
    }
    logOut(){
      return this.afAuth.signOut().then(()=>{
        localStorage.removeItem('users');
        this.route.navigate(['sign-in'])
      })
    }

}
