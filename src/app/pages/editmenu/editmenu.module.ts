import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditmenuPageRoutingModule } from './editmenu-routing.module';

import { EditmenuPage } from './editmenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditmenuPageRoutingModule
  ],
  declarations: [EditmenuPage]
})
export class EditmenuPageModule {}
