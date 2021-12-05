import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { AnimationService } from '../../animation.service';
import { IAnimationListItem } from '../../models/animation-list-item.interface';

@Component({
  selector: 'app-animation-card',
  templateUrl: './animation-card.component.html',
  styleUrls: ['./animation-card.component.scss']
})
export class AnimationCardComponent implements OnInit {

  @Input() animation: IAnimationListItem;
  @Output() delete = new EventEmitter();

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
  }

  deleteCaff(id) {
    this.delete.emit();
  }
}
