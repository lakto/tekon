import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {AppSettings} from '../../app.settings';
import {AppMixins} from '../../app.mixins';

@Component({
    selector: 'app-list',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

    firstYear: number;
    firstWeek: number;

    currentYear: number;
    currentWeek: number;

    media: any = [];

    /*
    should look like:
    media = [
        2017-39: [
            2017-09-25,
            2017-10-01
        ]
    ]
     */

    dates: any = [];

    hideElement: boolean = false;

    constructor(private _renderer: Renderer2,
                private _ele: ElementRef) {
    }

    ngOnInit() {

        // calculate file name by date with year and week
        // start date
        const startYear = AppSettings.YEAR;
        const startMonth = AppSettings.MONTH - 1;
        const startDay = AppSettings.DAY + 1;
        const begin: Date = new Date(startYear, startMonth, startDay, 0, 0, 0, 0);

        // current date: the list begins here and it stops at the start date
        const today: Date = new Date();

        this.firstYear = begin.getFullYear();
        this.firstWeek = AppMixins.getWeek(begin);

        this.currentYear = today.getFullYear();
        this.currentWeek = AppMixins.getWeek(today);

        const date: Date = today;
        do {
//            const date =
            console.log(date);
            date.setDate((date.getDate() - 5));

            const week = AppMixins.getWeek(date);
            const year = date.getFullYear();
            const id: string = year + '-' + this.pad(week);
            // push start and end date of the week
//            this.media.push(id);
            this.media[id] = [];
            this.media[id].push(date);

        } while (date >= begin);

        console.log(this.media);
    }

    pad(n) {
        return (n < 10) ? ('0' + n) : n;
    }


    setError(ev, file: string, index: number) {

        console.log(index, file);
//        this.hideElement = true;
//        this.onError = (!error);
//        console.log(this.onError);
    }
}
