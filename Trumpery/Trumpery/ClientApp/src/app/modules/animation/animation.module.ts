import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationListComponent } from './components/animation-list/animation-list.component';
import { AnimationDetailComponent } from './components/animation-detail/animation-detail.component';
import { AnimationCardComponent } from './components/animation-card/animation-card.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
  declarations: [
    AnimationListComponent,
    AnimationDetailComponent,
    AnimationCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ]
})
export class AnimationModule { }
