import { Component } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  constructor() {}

  routeTypes = ['Run','Bike','Hike', 'All'];
  elevationRatings = ['Downhill','Flat','Hilly','Steep', 'All'];
  pavedOptions = ['Not Paved', 'Paved', 'Mixed', 'All'];
  scenicRating = [1,2,3,4,5];
  overallRating = [1,2,3,4,5];

  knobValues : {
    lower: 25;
    upper:75
  }

  ngOnInit() {
    const lengthRange = document.querySelector("#length");
    lengthRange.value = {lower:25, upper: 75};
  }

  listRoutes() {
    console.log("Started")
  }

  ionViewWillEnter() {
    
  }



  // TODO Clear button to clear search


  

}
