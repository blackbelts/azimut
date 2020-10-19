import { ProductReportPageModule } from './../pages/product-report/product-report.module';
import { ProductReportPage } from './../pages/product-report/product-report';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { ProductsPage } from './../pages/products/products';
import { ReportsPage } from './../pages/reports/reports';
import { Badge } from '@ionic-native/badge';
import { NotificationPage } from './../pages/notification/notification';
import { TabsPage } from './../pages/tabs/tabs';
import { HomePage } from './../pages/home/home';
import { SurrenderPage } from './../pages/surrender/surrender';
import { LoanPage } from './../pages/loan/loan';
import { MyinvestsPage } from './../pages/myinvests/myinvests';
import { MysubsPage } from './../pages/mysubs/mysubs';
import { FundPerformancePage } from './../pages/fund-performance/fund-performance';
import { ProfilePage } from './../pages/profile/profile';
import { LanguageService } from './../providers/language.service';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { Base64ToGallery } from '@ionic-native/base64-to-gallery'; 

// import { HomePage } from '../pages/home/home';
// import { PropertyDetailPage } from '../pages/property-detail/property-detail';
// import { PropertyFormPage } from '../pages/property-form/property-form';
//import { ListingMapviewPage } from "../pages/listing-mapview/listing-mapview";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CommonProvider } from '../providers/common/common';
import { UtilsProvider } from '../providers/utils/utils';
import { BrMaskerModule } from 'brmasker-ionic-3';
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
/* import { FileChooser } from '@ionic-native/file-chooser'; */
/* import { FilePath } from '@ionic-native/file-path'; */
/* import { FileTransfer } from '@ionic-native/file-transfer'; */
import { SocialSharing } from '@ionic-native/social-sharing';
/* import { Geolocation } from '@ionic-native/geolocation'; */
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { Http } from '@angular/http';
import { AutoCompleteModule } from 'ionic2-auto-complete';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ImagePicker } from '@ionic-native/image-picker';
import { OdooProvider } from '../providers/odoo/odoo';
import { MyUnitsPage } from '../pages/my-units/my-units';
import { from } from 'rxjs/observable/from';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { TabsPageModule } from '../pages/tabs/tabs.module';




export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    MyUnitsPage,
    FundPerformancePage,
    MysubsPage,
    MyinvestsPage,
    LoanPage,
    SurrenderPage,
    HomePage,
    /* TabsPage, */
    NotificationPage,
    ReportsPage,
    ProductsPage,
    /* ProductReportPage */
    
  ],
  imports: [

    BrowserModule,
    HttpModule,
    TabsPageModule,
    HttpClientModule,
    AutoCompleteModule,
    ProductReportPageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient],
      }
    }),
    BrMaskerModule,

    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp, {

      backButtonText: '',
      tabsHideOnSubPages: true,
    }),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    MyUnitsPage,
    FundPerformancePage,
    MysubsPage,
    MyinvestsPage,
    LoanPage,
    SurrenderPage,
    HomePage,
    TabsPage,
    NotificationPage,
    ReportsPage,
    ProductsPage
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CommonProvider,
    UtilsProvider,
    LanguageService,
    File,
    OdooProvider,
    Badge,
    FileTransfer,
    DocumentViewer
    /* Base64ToGallery */
  ],
  exports: [
    TranslateModule
  ]
})
export class AppModule { }
