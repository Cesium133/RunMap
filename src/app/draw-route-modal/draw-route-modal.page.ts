import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { loadModules } from 'esri-loader';
import { NavParams } from '@ionic/angular';

import * as Terraformer from 'terraformer';
import * as ArcGISParse from 'terraformer-arcgis-parser';
import length from '@turf/length';

@Component({
  selector: 'app-draw-route-modal',
  templateUrl: './draw-route-modal.page.html',
  styleUrls: ['./draw-route-modal.page.scss'],
})

export class DrawRouteModalPage implements OnInit, OnDestroy {
  // The <div> where we will place the map
  @ViewChild("viewDiv", { static: true }) private mapViewEl: ElementRef;
  view: any;
  arcgisJSON: Object;
  geoJSON: any;
  routeLength: number = 0;
  routeData: Object;

  constructor(public modalController: ModalController, public navParams: NavParams) {}

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

      const graphicsLayer = new GraphicsLayer();
      
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

      const searchWidget = new Search({
        view:this.view
      });

      const sketch = new Sketch({
        layer: graphicsLayer,
        view: this.view,
        availableCreateTools: ["polyline"]
      });

      map.add(graphicsLayer);

      this.view.ui.add(locate, {
        position: "top-left"
      });

      this.view.ui.add(searchWidget, {
        position: "top-right",
        index:0
      });

      this.view.ui.add(baseMapToggle, {
        position: "top-right",
        
      });

      this.view.ui.add(sketch, {
        position: "bottom-left"
      });

      sketch.on("create", (e)=> {
        if (e.state === "complete") {
          // TODO: make button at top active when sketch is finished
          // TODO: when first sketch is finished drawing, user can't draw anymore
          let graphics = graphicsLayer.graphics
          graphics.forEach((graphic)=> {
            this.arcgisJSON = graphic.geometry.toJSON();
            this.convertJSONtoGeoJSON()
          });
        }
      });
      return this.view;

    } catch (error) {
      console.log("EsriLoader: ", error);
    }
  }

  convertJSONtoGeoJSON() {
    /*
    ? what happens after sketch is completed? 
    * convert sketch to ArcGIS JSON using geometry method toJSON()
    * use Terraformer to convert ArcGIS JSON to GeoJSON
    * New GeoJSON is still in Pseudo Mercator (id:3857), so use Terraformer tool to convert toGeographic (id:4326)
    * calculate length using turf 
    */
    console.log(JSON.stringify(this.arcgisJSON))
    let geoJSON3857 = ArcGISParse.parse(this.arcgisJSON);
    this.geoJSON = Terraformer.Tools.toGeographic(geoJSON3857);
    this.calculateLength();
  }

  calculateLength() {
    this.routeLength = length(this.geoJSON, {
      units:"miles"
    })
    this.routeLength = parseFloat(this.routeLength.toFixed(2))
    console.log(this.routeLength)
    this.routeData = {
      'json': this.geoJSON,
      'length': this.routeLength
    }
    // console.log(length(this.geoJSON))
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
    await this.modalController.dismiss(this.routeData);
  }
}
