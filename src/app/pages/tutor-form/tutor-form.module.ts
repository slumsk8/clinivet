import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TutorFormPageRoutingModule } from './tutor-form-routing.module';

import { TutorFormPage } from './tutor-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TutorFormPageRoutingModule
  ],
  declarations: [TutorFormPage]
})
export class TutorFormPageModule {}
