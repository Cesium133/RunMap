import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { loadModules } from 'esri-loader';

@Component({
  selector: 'app-draw-route-modal',
  templateUrl: './draw-route-modal.page.html',
  styleUrls: ['./draw-route-modal.page.scss'],
})

export class DrawRouteModalPage implements OnInit, OnDestroy {
  // The <div> where we will place the map
  @ViewChild("viewDiv", { static: true }) private mapViewEl: ElementRef;
  view: any;

  constructor(public modalController: ModalController) {}

  async initializeMap() {
    try {
      const [Map, MapView] = await loadModules(["esri/Map", "esri/views/MapView"]);

      const mapProperties = {
        basemap: "topo"
      };

      const map = new Map(mapProperties);

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-77.03, 38.93],
        zoom: 10,
        map: map
      };

      this.view = new MapView(mapViewProperties);

      return this.view;
    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    this.initializeMap();
  }

  ngOnDestroy() {
    if (this.view) {

      this.view.container = null;
    }
  }

  async routeFinishedDrawing() {
    await this.modalController.dismiss();
  }
}
