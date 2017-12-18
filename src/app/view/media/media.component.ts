import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
    selector: 'app-media',
    templateUrl: './media.component.html',
    styleUrls: ['./media.component.scss']
})
export class MediaComponent implements OnInit {

    @Input() id?: string;

    constructor(private _activatedRoute: ActivatedRoute) {
    }

    ngOnInit() {
        if (!this.id) {
            this._activatedRoute.params.subscribe((params: Params) => {
                this.id = params['id'];
            });
        }
    }

}
