import { DocumentViewer } from '@ionic-native/document-viewer';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

/**
 * Generated class for the ProductReportPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product-report',
  templateUrl: 'product-report.html',
})
export class ProductReportPage {
  filesList = []
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public platform:Platform,
    private document: DocumentViewer,
     private files: File,
    private transfer: FileTransfer

    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductReportPage');
    this.filesList = this.navParams.get("files")
    console.log(this.files)
  }
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
