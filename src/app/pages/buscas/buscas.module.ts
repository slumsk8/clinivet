import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuscasPageRoutingModule } from './buscas-routing.module';

import { BuscasPage } from './buscas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuscasPageRoutingModule
  ],
  declarations: [BuscasPage]
})
export class BuscasPageModule {}
