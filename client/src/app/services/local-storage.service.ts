import { Injectable } from '@angular/core';
import * as CryptoTs from 'crypto-ts';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  getItem(key: string): string {
    if (!key || !localStorage.getItem(key)) {
      return '';
    }
    return CryptoTs.AES.decrypt(localStorage.getItem(key) as string, 'iamsofi').toString(CryptoTs.enc.Utf8);
  }

  setItem(key: string, value: string): void {
    if (!key || !value) {
      return;
    }
    localStorage.setItem(key, CryptoTs.AES.encrypt(value, 'iamsofi').toString());
  }

  removeItem(key: string): void {
    if (!key) {
      return;
    }
    localStorage.removeItem(key);
  }

  clear(): void {
    localStorage.clear();
  }
}
