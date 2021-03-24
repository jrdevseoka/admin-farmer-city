import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Supplier } from 'src/app/models/supplier';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
  supplierID: any;
  supplier: any;
  message: any;
  application: any;
  constructor(
    private firestore: AngularFirestore,
    public activated:  ActivatedRoute,
    private route: Router
    ) {
      this.supplierID = this.activated.snapshot.paramMap.get('ref');
    }

  ngOnInit() {
    this.supplierID = this.activated.snapshot.paramMap.get('ref');
    console.log(this.supplierID);
    this.firestore.collection('Supplies').doc(this.supplierID).valueChanges().subscribe(results =>{
      this.supplier = results as Supplier;
      console.log(this.supplier)
    });
  }
  declineApplication(){
    this.firestore.collection('Supplies').doc(this.supplierID).delete().then(
     res=>{
      this.application = false;
      this.message = `Thank you for your interest in Farm City Marketplace. We have decided
       not to approve your application to become a supply at our marketplace`;

     }
    )

  }
  approveApplication(){
    let application: any = {
      'applicationStatus':  true
    }
    this.firestore.collection('Supplies').doc(this.supplierID).update(application).then(
      results=>{
        this.application = true;
        this.message = `Thank you for your interest in Farm City Marketplace. Your application was approved
        , you may processed to login in to your account and add product that you'll provide to our marketplace`;
        console.log(this.message)


      }
    )
    this.route.navigate(['dashboard']);
  }
}
