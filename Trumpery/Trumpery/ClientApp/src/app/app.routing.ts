import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './modules/auth/auth.component';
import { LoginComponent } from './modules/auth/components/login/login.component';
import { RegistrationComponent } from './modules/auth/components/registration/registration.component';
import { LayoutComponent } from './core/components/layout/layout.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { AnimationListComponent } from './modules/animation/components/animation-list/animation-list.component';
import { AnimationDetailComponent } from './modules/animation/components/animation-detail/animation-detail.component';


const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'registration',
        component: RegistrationComponent
      },
      {
        path: '**',
        redirectTo: 'login'
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'animations',
        children: [
          {
            path: 'browse',
            component: AnimationListComponent
          },
          {
            path: ':id',
            component: AnimationDetailComponent
          },
          {
            path: '',
            pathMatch: 'full',
            redirectTo: 'browse'
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'animations/browse'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy', scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
