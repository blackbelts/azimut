import { CommonProvider } from './../providers/common/common';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { OdooProvider } from '../providers/odoo/odoo';
import { LoginPage } from '../pages/login/login';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  textDir: string = "ltr";
  rootPage: any = "LoginPage";
  lang: any
  constructor(
    public platform: Platform,
    public translate: TranslateService,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public common: CommonProvider,
    public odoo:OdooProvider
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
  }
  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      console.log(localStorage.getItem("uid"),localStorage.getItem("password"))
      if(localStorage.getItem("uid") !=null && localStorage.getItem("password") !=null){
        this.odoo.setUid(parseInt(localStorage.getItem("uid")))
        this.odoo.setPassword(localStorage.getItem("password"))
        this.rootPage="TabsPage"
      }else{
        this.rootPage="LoginPage"
      }
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log("hide")
      this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
        console.log("done")
        this.textDir = event.lang == 'ar' ? 'rtl' : 'ltr';
      });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
