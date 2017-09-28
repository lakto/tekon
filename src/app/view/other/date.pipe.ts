import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate'
})
export class FormatDatePipe implements PipeTransform {

    transform(value: number, format?: string): any {
        console.log(value);
        console.log(format);

        let date = new Date(value * 1000).toString();

        console.log(date);

        const dd = date.substr(8, 2);
        const mm = date.substr(4, 3);
        const yyyy = date.substr(11, 4);

        if (format !== undefined) {
            switch (format) {
                case 'wd':
                    // weekday
                    date = date.substr(0, 3);
                    break;
                case 'dd':
                    // day
                    date = date.substr(8, 2);
                    break;
                case 'mm':
                    // month
                    date = date.substr(4, 3);
                    break;
                case 'yyyy':
                    // year
                    date = date.substr(11, 4);
                    break;
                case 'yyyy-mm-dd':
                    date = yyyy + '-' + mm + '-' + dd;
                    break;
                default:
                  // yyyy-mm-dd
                  date = yyyy + '-' + mm + '-' + dd;
            }
        }

        return date;
    }

}
