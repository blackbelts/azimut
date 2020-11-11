import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoanPage } from './loan';

@NgModule({
  declarations: [
    LoanPage,
  ],
  imports: [
    IonicPageModule.forChild(LoanPage),
    TranslateModule
  ],
})
export class LoanPageModule {}
