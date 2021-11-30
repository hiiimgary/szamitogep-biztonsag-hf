import { Component, OnInit } from '@angular/core';
import { AnimationService } from '../../animation.service';
import { Observable } from 'rxjs';
import { IAnimationListItem } from '../../models/animation-list-item.interface';

@Component({
  selector: 'app-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.scss']
})
export class AnimationListComponent implements OnInit {

  animationList$: Observable<IAnimationListItem[]>;

  constructor(
    private readonly animationService: AnimationService
  ) { }

  ngOnInit(): void {
    this.animationList$ = this.animationService.getAnimationList();
  }

}
