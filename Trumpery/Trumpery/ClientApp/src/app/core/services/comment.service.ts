import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private req: HttpClient) { }

  addComment(id, content) {
    console.log(id);
    return this.req.post(`caff/add-comment/${id}`, { content });
  }

  deleteComment(id: number) {
    return this.req.delete(`caff/delete-comment/${id}`);
  }
}
