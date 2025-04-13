import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appGrowOnHover]'
})
export class GrowOnHoverDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Már induláskor beállítjuk a transition-t
    this.renderer.setStyle(this.el.nativeElement, 'transition', 'transform 0.3s');
  }

  @HostListener('mouseenter')
  onMouseEnter() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1.2)');
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.renderer.setStyle(this.el.nativeElement, 'transform', 'scale(1)');
  }

}
