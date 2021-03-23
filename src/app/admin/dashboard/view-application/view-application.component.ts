import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['./view-application.component.css']
})
export class ViewApplicationComponent implements OnInit {
  supplierID: any;

  constructor(public activated:  ActivatedRoute) { }

  ngOnInit(): void {
    this.supplierID = this.activated.snapshot.paramMap.get('ref');
  }

}
