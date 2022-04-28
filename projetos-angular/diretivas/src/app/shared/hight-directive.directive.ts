import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appHightDirective]'
})
export class HightDirectiveDirective {

  backgroundColor:string = '';
  
  @Input() defaultColor:string = 'green';
  @Input('appHightDirective') highlightColor:string = 'white';

  @HostListener('mouseenter') onMouseOver(){
    this.backgroundColor = this.defaultColor;
  }

  @HostListener('mouseleave') onMouseLeave(){
    this.backgroundColor = this.highlightColor;
  }

  @HostBinding('style.backgroundColor') get setColor(){
    return this.backgroundColor;
  };

  constructor() {}

  ngOnInit(){
    this.backgroundColor = this.defaultColor;
  }

}
