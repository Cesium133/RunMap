import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  routeRecords : Array<any> = []


  constructor(private activatedRoute: ActivatedRoute, public router: Router) { }

  ngOnInit() {
    console.log("Results page onInit")
    this.activatedRoute.queryParams.subscribe((params)=> {
      console.log(params)
      this.routeRecords = params.routesArray;
    })
    // this.routeRecords.forEach((route) => {
    //   console.log(JSON.stringify(route))
    // })
  }



}
