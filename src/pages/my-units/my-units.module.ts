import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyUnitsPage } from './my-units';

@NgModule({
  declarations: [
    MyUnitsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyUnitsPage),
    TranslateModule
  ],
})
export class MyUnitsPageModule {}
