import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { AnimationService } from '../../animation.service';
import { map, switchMap } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommentService } from 'src/app/core/services/comment.service';

@Component({
  selector: 'app-animation-detail',
  templateUrl: './animation-detail.component.html',
  styleUrls: ['./animation-detail.component.scss']
})
export class AnimationDetailComponent implements OnInit {

  animationDetail$: Observable<any>;

  commentForm: FormGroup;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly animationService: AnimationService,
    private readonly commentService: CommentService

  ) { }

  ngOnInit(): void {


    this.commentForm = new FormGroup({
      comment: new FormControl('', [Validators.required])
    });

    this.animationDetail$ = this.route.params.pipe(
      map((params: { id: number }) => params.id),
      switchMap((id: number) => this.animationService.getAnimationDetail(id))
    );

    this.animationDetail$.subscribe(console.log);

    console.log(this.animationDetail$);
  }

  onSaveComment(id: number) {
    console.log(id);
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }
    const comment: string = this.commentForm.get('comment').value;
    this.commentService.addComment(id, comment).subscribe();
  }


}
