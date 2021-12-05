
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";
import { map, catchError } from 'rxjs/operators';
import { of } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate() {
        return this.authService.getLoginStatus().pipe(
            catchError((err) => {
                this.router.navigate(['/auth/login']);
                return of(false);
            }),
            map((res) => {
                return true;
            })
        );
    }
}