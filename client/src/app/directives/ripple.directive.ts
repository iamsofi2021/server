import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appRipple]'
})
export class RippleDirective {
  constructor(private el: ElementRef, public renderer: Renderer2){}
  @HostListener('click', ['$event']) onClick(e: any): void {
    const x = e.clientX - e.target.offsetLeft;
    const y = e.clientY - e.target.offsetTop;

    const ripples = document.createElement('span');
    ripples.style.left = x + 'px';
    ripples.style.top = y + 'px';

    this.renderer.appendChild(this.el.nativeElement, ripples);
    setTimeout(() => {
      ripples.remove();
    }, 1000);
  }
}
