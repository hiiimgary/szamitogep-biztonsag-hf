import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimationListComponent } from './components/animation-list/animation-list.component';
import { AnimationDetailComponent } from './components/animation-detail/animation-detail.component';



@NgModule({
  declarations: [
    AnimationListComponent,
    AnimationDetailComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AnimationModule { }
