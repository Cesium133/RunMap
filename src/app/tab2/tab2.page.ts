import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppComponent }  from '../app.component';
import { DrawRouteModalPage } from '../draw-route-modal/draw-route-modal.page';

@NgModule({
  imports: [ FormGroup, FormsModule, ReactiveFormsModule ],
  declarations: [ AppComponent ],
  entryComponents: [ DrawRouteModalPage ]

})


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  form:FormGroup;
  routeJSON: Object;
  routeLength: number;
  showForm: boolean = true;

  routeTypes = ['Run','Bike','Hike'];
  elevationRatings = ['Downhill','Flat','Hilly','Steep'];
  pavedOptions = ['Not Paved', 'Paved', 'Mixed'];
  scenicRating = [1,2,3,4,5];
  overallRating = [1,2,3,4,5];
  

  constructor(public router: Router, public modalController: ModalController) {}

  async goToDrawRouteModalPage() {
    console.log("Clicked on Draw Route Modal");
    const drawRouteModal = await this.modalController.create({
      component:DrawRouteModalPage,
      // componentProps: 
    });
    drawRouteModal.onDidDismiss().then((routeData) => {
      this.routeJSON = routeData.data.json;
      this.routeLength = routeData.data.length
    });
    return await drawRouteModal.present();
  }

}
