import {Component, ElementRef, EventEmitter, OnInit, Output, Renderer2} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {AppMixins} from '../../app.mixins';
import {Router} from '@angular/router';
import {AppComponent} from '../../app.component';

export interface Item {
    id: string;
    start: Date;
    end: Date;
}

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    list: Item[] = [];

    admin: boolean = false;
    token: string = 'gaga';

    @Output() toggleItem = new EventEmitter<any>();

    activeEle: number = 0;

    constructor(private _renderer: Renderer2,
                private _ele: ElementRef,
                private _router: Router) {
    }

    ngOnInit() {

        // get the route parameter
        // if it's admin and a token is true
        // show the list for administrators
        // otherwise go to the start page /
        if (this.token !== undefined && this._router.url === '/admin') {
            // admin is true
            this.admin = true;
        } else {
            // admin is false; go to start
            this.admin = false;
            this._router.navigateByUrl('/');
        }

        // calculate the file name by date
        // it needs the year and the week number
        // looks like: yyyy-ww

        // when was the begin of the project? first date
        // get the data from the AppSettings
        const begin: Date = new Date(AppSettings.YEAR, AppSettings.MONTH - 1, AppSettings.DAY, 12, 0, 0, 0);

        // current date: the list starts here and it stops at the begin date
        const today: Date = new Date();
        today.setHours(12, 0, 0, 0);
        const day: number = today.getDay();
        today.setDate((today.getDate() - day + 1));
//        console.log('Today: ', today);

        const date = today;

        do {
            const obj: Item = {
                id: undefined,
                start: undefined,
                end: undefined
            };

            // set date, which will be used as start of the week and which will be compared with the begin date
            const start: Date = new Date(date.setDate(date.getDate() - 7));
            obj.id = date.getFullYear() + '-' + AppMixins.leadingZero(AppMixins.getWeek(date));
            obj.start = new Date(start);

            const end: Date = start;
            end.setDate(end.getDate() + 6);
            obj.end = new Date(end);

            this.list.push(obj);

        } while (date > begin);

        console.log(this.list);
    }

    toggleView() {
        const url = (this._router.url === '/' ? '/admin' : '/');

        this._router.navigateByUrl(url);

    }

    toggle(id: string, index?: number) {
        this.toggleItem.emit({id, index});
        this.activeEle = index;
        /*
        if (this.selectedRow === index) {
            // close the detail view
            this.selectedRow = undefined;
            this.toggleItem.emit({id, index});
        } else {
            // open the detail view
            this.selectedRow = index;
            this.toggleItem.emit({id, index});
        }
        */

    }

}
