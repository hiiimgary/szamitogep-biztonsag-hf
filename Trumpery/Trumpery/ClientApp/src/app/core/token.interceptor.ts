import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StorageService } from './services/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private storageService: StorageService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ withCredentials: true });
    const tokenName = 'jwt_token'; // az authentikációhoz használt, cookieban tárolt token neve

    // Kiszedi a tokent a cookie-k közül, attól függően hogy szerver vagy kliens oldalon vagyunk
    const token = this.storageService.getCookie(tokenName, document.cookie);

    // Beállítja az Authorization és Locale headert a requestekben
    req = req.clone({
      setHeaders: {
        Authorization: (token ? token : ''),
      }
    });

    return next.handle(req);
  }
}