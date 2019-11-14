import { Component, OnInit, NgModule } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import { ModalController } from '@ionic/angular';

import { ViewRoutesModalPage } from '../view-routes-modal/view-routes-modal.page';

@NgModule({
  entryComponents: [ ViewRoutesModalPage ]
})

@Component({
  selector: 'app-results',
  templateUrl: './results.page.html',
  styleUrls: ['./results.page.scss'],
})
export class ResultsPage implements OnInit {

  routeRecords : Array<any> = []


  constructor(private activatedRoute: ActivatedRoute, public router: Router, public modalController: ModalController) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params)=> {
      this.routeRecords = JSON.parse(params.routesArray);
      // console.log(this.routeRecords[3])
      // this.routeRecords.forEach((record) => {
      //   console.log(record);
      // });
    });

  }

  async goToViewRoutesModalPage(index) {
    const viewRouteModal = await this.modalController.create({
      component: ViewRoutesModalPage,
      componentProps: {
        'chosenRoute': this.routeRecords[index]
      }
    });

    return await viewRouteModal.present();
  }



}
