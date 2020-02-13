import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PetsListPageRoutingModule } from './pets-list-routing.module';

import { PetsListPage } from './pets-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PetsListPageRoutingModule
  ],
  declarations: [PetsListPage]
})
export class PetsListPageModule {}
