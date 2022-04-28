import { Directive, 
         Input,
         TemplateRef,
        ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[ngElse]'
})
export class NgElseDirective {

  @Input() set ngElse(condicao: boolean){
    if (!condicao) {
      this._viewContainer.createEmbeddedView(this._templateRef);
    }else{
      this._viewContainer.clear();
    }
  }

  constructor(
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) { }

}
