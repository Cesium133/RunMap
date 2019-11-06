import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  routeTypes = ['Run','Bike','Hike'];
  elevationRatings = ['Downhill','Flat','Hilly','Steep'];
  pavedOptions = ['Not Paved', 'Paved', 'Mixed'];
  scenicRating = [1,2,3,4,5];
  overallRating = [1,2,3,4,5];
  

  constructor() {}

}
