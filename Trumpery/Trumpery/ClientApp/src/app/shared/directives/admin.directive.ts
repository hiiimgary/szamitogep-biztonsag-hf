import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: '[adminOnly]'
})
export class AdminDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private view: ViewContainerRef,
    private authService: AuthService
  ) {
    if (!this.authService.getIsAdmin()) {
      this.view.clear();
      return;
    }
    this.view.createEmbeddedView(this.templateRef);
  }
}
