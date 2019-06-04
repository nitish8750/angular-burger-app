// import { Directive, HostListener, HostBinding, ElementRef, Renderer } from '@angular/core';

// @Directive({
//     selector: '[appDropdown]'
// })
// export class DropdownDirective {

//     constructor(private el: ElementRef, private renderer: Renderer) { }

//     @HostBinding('class.show') isOpen = false;

//     @HostListener('click') toggleOpen() {
//         // let part = this.el.nativeElement.querySelector('.card-text');
//         // this.renderer.setElementStyle(part, 'display', 'block');
//         this.el.nativeElement.classList.toggle('show');
//         this.el.nativeElement.children[1].classList.toggle('show')
//     }
// }

import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective {
  @HostBinding('class.open') isOpen = false;
  @HostListener('document:click', ['$event']) toggleOpen() {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  constructor(private elRef: ElementRef) {}
}