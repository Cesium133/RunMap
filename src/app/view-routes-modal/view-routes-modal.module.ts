import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ViewRoutesModalPage } from './view-routes-modal.page';

const routes: Routes = [
  {
    path: '',
    component: ViewRoutesModalPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ViewRoutesModalPage]
})
export class ViewRoutesModalPageModule {}
