import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { loadModules } from 'esri-loader';
import * as ArcGISParse from 'terraformer-arcgis-parser';


@Component({
  selector: 'app-view-routes-modal',
  templateUrl: './view-routes-modal.page.html',
  styleUrls: ['./view-routes-modal.page.scss'],
})
export class ViewRoutesModalPage implements OnInit {

  @ViewChild("mapDiv", { static: true }) private mapViewEl: ElementRef;

  view: any;
  chosenRoute: any;
  chosenRouteArcGISJson: any;
  constructor(public modalController: ModalController) { }

  async initializeMap() {
    try {
      const [
        Map,
        MapView,
        BasemapToggle,
        Locate,
        Graphic,
        GraphicsLayer,
        Search,
        Sketch,
      ] = await loadModules([
        "esri/Map",
        "esri/views/MapView",
        "esri/widgets/BasemapToggle",
        "esri/widgets/Locate",
        "esri/Graphic",
        "esri/layers/GraphicsLayer",
        "esri/widgets/Search",
        "esri/widgets/Sketch",
      ]);

      const mapProperties = {
        basemap: "topo",

      };

      const map = new Map(mapProperties);

      const mapViewProperties = {
        container: this.mapViewEl.nativeElement,
        center: [-77.03, 38.93],
        zoom: 10,
        map: map
      };

      this.view = new MapView(mapViewProperties);

      const baseMapToggle = new BasemapToggle({
        view: this.view,
        nextBasemap: "hybrid"
      });

      const locate = new Locate({
        view: this.view,
        graphic: new Graphic({
          symbol: {
            type: "simple-marker",
            color: [10, 193, 247],
            size: 10,
            outline: {
              color: [0, 52, 124],
              width: 1
            }
          }
        })
      });

      // add json
      const polyline = {
        type: "polyline",
        paths: this.chosenRouteArcGISJson.paths
      }

      const lineSymbol = {
        type: "simple-line", // autocasts as new SimpleLineSymbol()
        color: [0, 226, 255],
        width: 4
      };

      const routeLayer = new Graphic({
        geometry: polyline,
        symbol: lineSymbol
      })

      this.view.graphics.add(routeLayer);
      this.view.goTo(routeLayer);

      // const searchWidget = new Search({
      //   view: this.view
      // });

      this.view.ui.add(locate, {
        position: "top-left"
      });

      // this.view.ui.add(searchWidget, {
      //   position: "top-right",
      //   index: 0
      // });

      this.view.ui.add(baseMapToggle, {
        position: "top-right",

      });


      return this.view;

    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  ngOnInit() {
    console.log(this.chosenRoute);
    this.initializeMap();
    this.convertJsonObject();
  }

  convertJsonObject() {
    this.chosenRouteArcGISJson = ArcGISParse.convert(JSON.parse(this.chosenRoute.routejson));
    console.log((this.chosenRouteArcGISJson.paths))
  }


  async dismissViewRoutesModalPage() {
    await this.modalController.dismiss();
  }


}
