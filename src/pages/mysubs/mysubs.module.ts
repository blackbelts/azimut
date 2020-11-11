import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MysubsPage } from './mysubs';

@NgModule({
  declarations: [
    MysubsPage,
  ],
  imports: [
    IonicPageModule.forChild(MysubsPage),
    TranslateModule
  ],
})
export class MysubsPageModule {}
