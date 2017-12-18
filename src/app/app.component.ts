import {Component} from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'app';

    id: string;


    toggleDetail($event) {
        this.id = $event.id;
        const index: number = $event.index;
    }
}
