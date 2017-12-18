import { Pipe, PipeTransform } from '@angular/core';
import {AppMixins} from '../../app.mixins';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

    transform(date: number, format?: string): any {

        // temp date
        const tmpDate: Date = new Date(date);

        // return value
        let value: string;

//        console.log(date);

        const dd = AppMixins.leadingZero(tmpDate.getDate());
        const mm = AppMixins.leadingZero(tmpDate.getMonth() + 1);
        const yyyy = tmpDate.getFullYear();

        if (format !== undefined) {
            switch (format) {
                case 'wd':
                    // weekday
                    value = JSON.stringify(tmpDate.getDay());
                    break;
                case 'dd':
                    // day
                    value = JSON.stringify(tmpDate.getDate());
                    break;
                case 'mm':
                    // month
                    value = JSON.stringify(tmpDate.getMonth());
                    break;
                case 'yyyy':
                    // year
                    value = JSON.stringify(tmpDate.getFullYear());
                    break;
                default:
                  // yyyy-mm-dd
                  value = yyyy + '-' + mm + '-' + dd;
            }
        }

        return value;
    }

}
