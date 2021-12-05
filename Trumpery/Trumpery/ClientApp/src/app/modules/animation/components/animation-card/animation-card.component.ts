import { Component, Input, OnInit } from '@angular/core';
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

  constructor(private animationService: AnimationService) { }

  ngOnInit(): void {
  }

  deleteCaff(id) {
    this.animationService.deleteCaff(id).subscribe(
      res => console.log(res),
      error => window.alert('Valami hiba történt!')
    );
  }
}
