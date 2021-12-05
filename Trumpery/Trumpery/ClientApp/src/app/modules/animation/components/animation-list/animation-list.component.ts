import { Component, OnInit } from '@angular/core';
import { AnimationService } from '../../animation.service';
import { Observable } from 'rxjs';
import { IAnimationListItem } from '../../models/animation-list-item.interface';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-animation-list',
  templateUrl: './animation-list.component.html',
  styleUrls: ['./animation-list.component.scss']
})
export class AnimationListComponent implements OnInit {

  animationList$: Observable<IAnimationListItem[]>;

  filterWords: string[] = [];

  filterControl: FormControl;

  constructor(
    private readonly animationService: AnimationService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
  ) { }

  ngOnInit(): void {
    this.filterControl = new FormControl('');
    this.animationList$ = this.route.queryParams.pipe(
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

  removeKeyword(str: string) {
    this.filterWords = this.filterWords.filter(w => w !== str);
  }

  onSearch() {
    if (this.filterWords.length < 1) {
      return;
    }

    let keyword = '';
    this.filterWords.forEach(w => keyword = `${keyword}${keyword === '' ? '' : '_'}${w}`);
    console.log(keyword);
    this.animationService.search(keyword).subscribe(() => {
      this.router.navigate(['/', 'animations', 'browse'], {queryParams: {keyword}});

    }
    );
  }

}
