
import { Injectable } from "@angular/core";
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree
} from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router) { }

    canActivate() {
        var isAuthenticated = this.authService.getLoginStatus();
        if (!isAuthenticated) {
            this.router.navigate(['/auth/login']);
        }
        return isAuthenticated;
    }
}