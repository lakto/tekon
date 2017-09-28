import {Directive, ElementRef, Input, OnChanges, Renderer2} from '@angular/core';

@Directive({
    selector: '[appImage]'
})
export class ImageDirective implements OnChanges {

    @Input() name: string;

    source: string;
    onError: string;

    constructor(private _renderer: Renderer2,
                private _ele: ElementRef) {
    }

    ngOnChanges() {
        this.onError = null; // 'assets/error.jpg';
        this.source = '/data/' + this.name + '.jpg';

        this._renderer.setAttribute(this._ele.nativeElement, 'src', this.source);
        this._renderer.setAttribute(this._ele.nativeElement, 'onError', 'this.src=\'' + this.onError + '\'');
    }
}
