import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditmenuPage } from './editmenu.page';

const routes: Routes = [
  {
    path: '',
    component: EditmenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditmenuPageRoutingModule {}
