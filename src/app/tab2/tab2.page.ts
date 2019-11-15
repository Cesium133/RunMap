import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { DrawRouteModalPage } from '../draw-route-modal/draw-route-modal.page';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [FormGroup, FormsModule, ReactiveFormsModule],
  declarations: [AppComponent],
  entryComponents: [DrawRouteModalPage]

})


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  form: FormGroup;
  routeJSON: Object;
  routeLength: number;
  showForm: boolean = true;
  pageMessage: String = "Route Details";

  routeTypes = ['Run', 'Bike', 'Hike'];
  elevationRatings = ['Downhill', 'Flat', 'Hilly', 'Steep'];
  pavedOptions = ['Not Paved', 'Paved', 'Mixed'];
  scenicRating = [1, 2, 3, 4, 5];
  overallRating = [1, 2, 3, 4, 5];


  constructor(public formBuilder: FormBuilder, public router: Router, public httpClient: HttpClient, public modalController: ModalController) {
    this.form = formBuilder.group({
      "type": ["Run", Validators.required],
      "scenicRating": ["3"],
      "elevationRating": ["Flat", Validators.required],
      "paved": ["Mixed", Validators.required],
      "overallRating": ["3", Validators.required],
      "notes": [""]
    })

  }

  async goToDrawRouteModalPage() {
    console.log("Clicked on Draw Route Modal");
    const drawRouteModal = await this.modalController.create({
      component: DrawRouteModalPage,
      // componentProps: 
    });
    drawRouteModal.onDidDismiss().then((routeData) => {
      this.routeJSON = routeData.data.json;
      this.routeLength = routeData.data.length;
    });
    return await drawRouteModal.present();
  }

  insertRoutes() {
    let insert_url = "http://kevincheriyan.com/runmap/insert_route.php"
    let params = new FormData();
    console.log(typeof this.routeJSON)
    console.log(JSON.stringify(this.routeJSON))

    // ? possible email to Zheng: first parameter inside params.append should match variable in insert_routes.php file. But what is same variable in php referring to if
    // ? if there is no html file with variable in it?

    params.append('routeType', this.form.controls.type.value);
    params.append('scenicRating', this.form.controls.scenicRating.value);
    params.append('elevationRating', this.form.controls.elevationRating.value);
    params.append('paved', this.form.controls.paved.value);
    params.append('notes', this.form.controls.notes.value);
    params.append('overallRating', this.form.controls.overallRating.value);
    params.append('routeLength', String(this.routeLength));
    params.append('routeJSON', JSON.stringify(this.routeJSON));

    this.httpClient.post(insert_url, params).subscribe(data => {
      console.log(data);
      this.showForm = false;
      this.pageMessage = "Your data has been successfully submitted!";
    })

  }

  initializeFields() {
    this.showForm = true;
    this.routeLength = null;
    this.form = this.formBuilder.group({
      "type": ["Run", Validators.required],
      "scenicRating": ["3"],
      "elevationRating": ["Flat", Validators.required],
      "paved": ["Mixed", Validators.required],
      "overallRating": ["3", Validators.required],
      "notes": [""]
    })
  }

  ionViewWillEnter() {
    this.initializeFields()
  }

  // TODO initialize fields function here

}
