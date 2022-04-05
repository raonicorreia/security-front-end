import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AesEncryptionService {


  iv:string = environment.aesEncryptionIv;
  key:string = environment.aesEncryptionKey

  constructor() { }

  encrypt(data: string | undefined):string {
    let result = '';
    if (data) {
      result = CryptoJS.AES.encrypt(
        data, CryptoJS.enc.Utf8.parse(this.key),
        {
            iv: CryptoJS.enc.Utf8.parse(this.iv),
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC,
            keySize: 128,
        })
        .toString();
    }
    return result;
  }
}
