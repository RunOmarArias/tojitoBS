import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditservicesPage } from './editservices.page';

const routes: Routes = [
  {
    path: '',
    component: EditservicesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditservicesPageRoutingModule {}
