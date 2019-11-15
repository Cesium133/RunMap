import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';
import {NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor(public httpClient: HttpClient, public router: Router) {}

  private baseURL = "http://kevincheriyan.com/runmap/";
  private getURL = this.baseURL + "get_routes.php";
  private routesObj : any = [];
  

  routeTypes = ['Run','Bike','Hike'];
  elevationRatings = ['Downhill','Flat','Hilly','Steep'];
  pavedOptions = ['Not Paved', 'Paved', 'Mixed'];
  scenicRating = [1,2,3,4,5];
  overallRating = [1,2,3,4,5];

  knobValues : {
    lower: 25;
    upper:75
  }

  ngOnInit() {
    const lengthRange = document.querySelector("#length");
    // lengthRange.value = {lower:25, upper: 75};

    this.listRoutes();
  }

  listRoutes() {
    this.httpClient.get(this.getURL).subscribe(data => {
      this.routesObj = JSON.stringify(data);
      // this.routesObj.forEach((element)=> {
      //   console.log(element)
      // })
      
      
    });

  }

  goToResultsPage() {

    let navExtras: NavigationExtras = {
      queryParams: {
        routesArray: this.routesObj
      }
    }


    this.router.navigate(['results'], navExtras);
  }

  ionViewWillEnter() {
    // ! add here
  }



  // TODO Clear button to clear search


  

}
