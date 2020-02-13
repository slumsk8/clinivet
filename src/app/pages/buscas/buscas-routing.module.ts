import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuscasPage } from './buscas.page';

const routes: Routes = [
  {
    path: '',
    component: BuscasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuscasPageRoutingModule {}
