import { Directive, inject } from '@angular/core';
import { AuthService } from './auth.service';
import { TemplateRef } from '@angular/core';
import { ViewContainerRef } from '@angular/core';
import { User } from './types';
import { Input } from '@angular/core';

@Directive({
  selector: '[appHasAuthority]'
})
export class HasAuthorityDirective {

  private _authService: AuthService = inject(AuthService);
  private _templateRef = inject(TemplateRef);
  private _viewContainer = inject(ViewContainerRef);
  private _roleOrPermission!: string;

  @Input()
  set isGranted(roleOrPermission: string) {
    this._roleOrPermission = roleOrPermission;
  }


  ngOnInit() {
    if (this._authService.isGranted(this._roleOrPermission)) {
      this._viewContainer.clear();
      this._viewContainer.createEmbeddedView(this._templateRef);
    }
  }

}
