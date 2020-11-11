import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyinvestsPage } from './myinvests';

@NgModule({
  declarations: [
    MyinvestsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyinvestsPage),
    TranslateModule
  ],
})
export class MyinvestsPageModule {}
