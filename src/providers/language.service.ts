import { Injectable } from "@angular/core";
import { LanguageModel } from "../models/language.model";
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LanguageService {
  languages: Array<LanguageModel> = new Array<LanguageModel>();

  constructor(private translate: TranslateService) {
    this.languages.push(
      { name: "English", code: "en" },
      { name: "Arabic", code: "ar" }
    );
  }

  getLanguages() {
    return this.languages;
  }
  getLanguage() {
    console.log(this.translate.getDefaultLang(), this.translate.getBrowserLang())
    let language = this.translate.getDefaultLang();
    this.translate.setDefaultLang(language);

    return this.translate.getDefaultLang();
  }
  setLanguage(setLang) {
    console.log("setLang" + setLang)
    localStorage.setItem("lang", setLang)
    this.translate.setDefaultLang(setLang)
    this.translate.use(setLang);
  }
}
