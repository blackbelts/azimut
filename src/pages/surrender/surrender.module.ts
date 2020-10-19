import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SurrenderPage } from './surrender';

@NgModule({
  declarations: [
    SurrenderPage,
  ],
  imports: [
    IonicPageModule.forChild(SurrenderPage),
    TranslateModule
  ],
})
export class SurrenderPageModule {}
