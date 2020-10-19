import { TranslateModule } from '@ngx-translate/core';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FundPerformancePage } from './fund-performance';

@NgModule({
  declarations: [
    FundPerformancePage,
  ],
  imports: [
    IonicPageModule.forChild(FundPerformancePage),
    TranslateModule
  ],
})
export class FundPerformancePageModule {}
