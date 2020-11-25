import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Nego2Page } from './nego2.page';

const routes: Routes = [
  {
    path: '',
    component: Nego2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Nego2PageRoutingModule {}
