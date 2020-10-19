import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProductReportPage } from './product-report';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    ProductReportPage,
  ],
  imports: [
    IonicPageModule.forChild(ProductReportPage),
    TranslateModule
  ],
})
export class ProductReportPageModule {}
