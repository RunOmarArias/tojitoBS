import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditservicesPageRoutingModule } from './editservices-routing.module';

import { EditservicesPage } from './editservices.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditservicesPageRoutingModule
  ],
  declarations: [EditservicesPage]
})
export class EditservicesPageModule {}
