import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IAnimationListItem } from '../../models/animation-list-item.interface';

@Component({
  selector: 'app-animation-card',
  templateUrl: './animation-card.component.html',
  styleUrls: ['./animation-card.component.scss']
})
export class AnimationCardComponent implements OnInit {

  @Input() animation: IAnimationListItem;

  constructor() { }

  ngOnInit(): void {
  }

}
