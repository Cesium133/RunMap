import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { DrawRouteModalPage } from './draw-route-modal.page';

const routes: Routes = [
  {
    path: '',
    component: DrawRouteModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DrawRouteModalPage]
})
export class DrawRouteModalPageModule {}
