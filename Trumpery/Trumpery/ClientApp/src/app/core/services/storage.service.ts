import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  public setCookie(key: string, data: any, expirationInSecs?: number) {
    const expiration = typeof expirationInSecs !== 'undefined'
      ? new Date(new Date().getTime() + expirationInSecs * 1000)
      : null;
    const stringifiedData = typeof data === 'string' ? data : JSON.stringify(data);
    document.cookie = `${key}=${stringifiedData}; path=/; ${expiration ? `expires=${expiration.toUTCString()}` : ''}`;
  }

  public getCookie(key: string, cookies: string, defaultValue: any = null): string {
    const value = `; ${cookies}`;
    const parts = value.split(`; ${key}=`);
    return parts.length === 2 ? parts.pop().split(';').shift() : defaultValue;
  }
}
