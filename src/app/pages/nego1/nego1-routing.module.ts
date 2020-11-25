import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Nego1Page } from './nego1.page';

const routes: Routes = [
  {
    path: '',
    component: Nego1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Nego1PageRoutingModule {}
