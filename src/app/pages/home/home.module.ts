import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { EditmenuPage } from '../editmenu/editmenu.page';
import { EditservicesPage } from '../editservices/editservices.page';
import { EditmenuPageModule } from '../editmenu/editmenu.module';
import { EditservicesPageModule } from '../editservices/editservices.module';

@NgModule({
  entryComponents: [
    EditmenuPage,
    EditservicesPage
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    EditmenuPageModule,
    EditservicesPageModule
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
