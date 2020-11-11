import { CommonProvider } from './../../providers/common/common';
import { FileTransfer } from '@ionic-native/file-transfer';
import { DocumentViewer } from '@ionic-native/document-viewer';
import { DomSanitizer } from '@angular/platform-browser';
import { OdooProvider } from './../../providers/odoo/odoo';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { ProductReportPage } from '../product-report/product-report';

/**
 * Generated class for the ProductsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-products',
  templateUrl: 'products.html',
})
export class ProductsPage {
  resobjproductpricing
  productPricing
  data: number[]
  name;
  allData: any[] = []
  productFiles;
  price;
  file: any[] = [];
  products: any = []
  loader: boolean = false
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public sanitizer: DomSanitizer,
    public odooProv: OdooProvider,
    private platform: Platform,
    private document: DocumentViewer,
    private files: File,
    private transfer: FileTransfer,
    private common: CommonProvider
  ) {
    this.getData()

  }
  async getData() {
    this.common.showLoading()
    this.data = []
    let productsObj = []
    let product_ids = []
    await this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
      "product.template", "search_read", [{
        experssion: "%3D", filed: "type",
        value: 'financial'
      }],
      [{ prop: "fields", prop_values: ["name", "description","dtd", "wtd","mtd","qtd","ytd", "ytd2", "ytd3", "ytd4"] }]).map(res => res)
      .subscribe(productsRes => {
        console.log("productsRes", productsRes)
        productsObj = JSON.parse(JSON.stringify(productsRes))
        productsObj.forEach((product, index) => {
          product.pricingList = []
          product.fileList = []
          productsObj[index] = product
          product_ids.push(product.id)
        })
        this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
          "product.pricing", "search_read", [{
            experssion: "in", filed: "product_price.id",
            value: product_ids
          }],
          []).map(res => res)
          .subscribe(pricingRes => {
            this.common.hideLoading()
            console.log("pricingRes", pricingRes)
            productsObj.forEach((product, index) => {
              let pricingList = []
              JSON.parse(JSON.stringify(pricingRes)).forEach(pricing => {
                if (product.id == pricing.product_price[0])
                  pricingList.push({
                    date_to: pricing.date_to,
                    price: pricing.price,
                    performance:pricing.performance
                  })
              })
              productsObj[index].pricingList = pricingList[pricingList.length - 1]
            })

          })
        this.odooProv.getOdooData(this.odooProv.getUid(), this.odooProv.getPassword(),
          "product.reports", "search_read", [{
            experssion: "in", filed: "product_reports.id",
            value: product_ids
          }],
          []).map(res => res)
          .subscribe(resFiles => {
            console.log("resFiles", resFiles)
            productsObj.forEach((product, index) => {
              let fileList = []
              JSON.parse(JSON.stringify(resFiles)).forEach(file => {
                if (product.id == file.product_reports[0])
                  fileList.push(file)
              })
              productsObj[index].fileList = fileList
            })

          })
        this.products = productsObj
        console.log("product_ids", this.products)
      })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductsPage');
  }
  openDetails(i) {
    this.products[i].open = !this.products[i].open;
  }
  pdfURL(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url)
  }
  countProps(obj) {
    var count = 0;

    for (var p of obj) {
      count++;
      var last = p;
    }
    return [last, count];
  }
  downloadAndOpenPdf(url) {
    this.common.showLoading();
    let path = null;
    if (this.platform.is('ios')) {
      path = this.files.documentsDirectory;
    } else {
      path = this.files.dataDirectory;
    }
    const transfer = this.transfer.create();
    transfer.download(url, path + 'product.pdf').then(entry => {
      let newurl = entry.toURL();
      this.document.viewDocument(newurl, 'application/pdf', {})
    })
    this.common.hideLoading();
    // window.open(url, '_blank', 'location=no');
  }

  goToReportPage(files) {
    this.navCtrl.push(ProductReportPage, { files: files })
  }
}
