import { Component, OnInit } from '@angular/core';
import { AnimationService } from '../../animation.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAnimationListItem } from '../../models/animation-list-item.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.scss']
})
export class AnimationListComponent implements OnInit {

  animationList$: Observable<IAnimationListItem[]>;

  filterWords: string[] = [];

  updateData = new BehaviorSubject<boolean>(true);

  filterControl: FormControl;

  constructor(
    private readonly animationService: AnimationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.filterControl = new FormControl('');
    this.animationList$ = this.updateData.asObservable().pipe(
      mergeMap(() => this.route.queryParams),
      map((params: {keyword: string}) => params.keyword),
      switchMap((keyword: string) => this.animationService.getAnimationList(keyword))
    );
  }

  addKeyword() {
    const word = this.filterControl.value.replace('_', '');

    if (word === '') {
      return;
    }
    if (!this.filterWords.includes(word)) {
      this.filterWords.push(word);
    }
    this.filterControl.reset();
  }

  deleteCaff(id: number) {
    this.animationService.deleteCaff(id).subscribe(
      res => this.updateData.next(true),
      error => window.alert('Valami hiba történt!')
    );
  }

  removeKeyword(str: string) {
    this.filterWords = this.filterWords.filter(w => w !== str);
  }

  onSearch() {
    if (this.filterWords.length < 1) {
      return;
    }

    this.router.navigate(['/', 'animations', 'browse'], {queryParams: {keyword: JSON.stringify(this.filterWords)}});
  }

}
