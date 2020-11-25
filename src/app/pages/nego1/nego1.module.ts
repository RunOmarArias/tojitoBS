import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Nego1PageRoutingModule } from './nego1-routing.module';

import { Nego1Page } from './nego1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Nego1PageRoutingModule
  ],
  declarations: [Nego1Page]
})
export class Nego1PageModule {}
