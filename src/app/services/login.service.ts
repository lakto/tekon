import {Injectable} from '@angular/core';

import {Observable} from 'rxjs/Observable';
import {ApiService} from './api.service';

@Injectable()
export class LoginService extends ApiService {

    login(): Observable<any> {

        // Create header for Basic Auth
        // let headers: Headers = new Headers();
        // headers.append('Authorization', 'Basic ' + btoa(email + ':' + password));

        return this.httpGet('/assets/data/conf.json', {});

    }


}
