// HostListener
import { Directive, HostListener, ElementRef, Renderer2, HostBinding } from '@angular/core';

@Directive({
  selector: '[appHighlightMouse]'
})
export class HighlightMouseDirective {
  private backgroundColor:string = '';
  
  @HostListener('mouseenter') onMouseOver(){
    // this._render.setStyle(
    //   this._elementRef.nativeElement,
    //   'background-color','red'
    // )
    this.backgroundColor = 'yellow';
    this.color = 'red';
  }

  @HostListener('mouseleave') onMouseLeave(){
    // this._render.setStyle(
    //   this._elementRef.nativeElement,
    //   'background-color','white'
    // )
    this.backgroundColor = 'white';
    this.color = 'black';
  }

  @HostBinding('style.backgroundColor') get setColor(){
    //codigo extra
    return this.backgroundColor;
  };

  @HostBinding('style.color') color:string = '';

  constructor(
    // private _elementRef: ElementRef,
    // private _render: Renderer2
  ) { 
  }

}
