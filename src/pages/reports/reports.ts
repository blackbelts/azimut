import { FileTransfer } from '@ionic-native/file-transfer';
import { OdooProvider } from './../../providers/odoo/odoo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import { File } from '@ionic-native/file';

// import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
// import { File } from '@ionic-native/file';
// import { Platform } from 'ionic-angular';
import { DocumentViewer } from '@ionic-native/document-viewer';



/**
 * Generated class for the ReportsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reports',
  templateUrl: 'reports.html',
})
export class ReportsPage {
  reports;
  constructor(public navCtrl: NavController, public sanitizer: DomSanitizer,
    private odooProv: OdooProvider, private platform: Platform, private document: DocumentViewer, private files: File,
    private transfer: FileTransfer) {
      this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(), "ppf.reports",
      "search_read", [],
       []).map(res => res)
        .subscribe(res => {
          this.reports = res;
        });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ReportsPage');
  }
  pdfURL(url){
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  // openRemoteFileByUrl(fileUrl, content_type='application/pdf'){
  //   const transfer = this.transfer.create();
  //   let path = null;
  //   if (this.platform.is('ios')) {
  //     path = this.file.documentsDirectory;
  //   } else if (this.platform.is('android')) {
  //     path = this.file.dataDirectory;
  //   }
  //   transfer.download(fileUrl, path + 'myfile.pdf').then(entry => {
  //     let url = entry.toURL();
  //     this.document.viewDocument(url, content_type, {});
  //   });
  // }
  downloadAndOpenPdf(url){
    // window.open(url, '_blank', 'location=no');

    let path = null;
    if (this.platform.is('ios')){
      path = this.files.documentsDirectory;
    } else {
      path = this.files.dataDirectory;
    }
    const transfer = this.transfer.create();
    transfer.download(url, path + 'product.pdf').then(entry =>{
      let newurl = entry.toURL();
      this.document.viewDocument(newurl, 'application/pdf', {})
    })
  }

}
