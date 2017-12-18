import {Component, Inject, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

import {LoginService} from '../../services/login.service';
import {ApiServiceResult} from '../../services/api-service-result';
import {ApiServiceError} from '../../services/api-service-error';
import {Users} from '../../services/users';
import {Md5} from 'ts-md5/dist/md5';
import {Session} from '../../services/session';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Input() timeout: boolean;

    form: FormGroup;

    formLabels = {
        'key': 'Password'
    };

    formErrors = {
        'key': 'The password is wrong'
    };

    validationMessages = {
        'key': {
            'required': 'The password is required'
        }
    };

    // title = 'Forbidden';
    title = 'Login to your TEKON app';

    session: Session = new Session();

    users: Users;
    error: any;

    loginError: string = undefined;

    constructor(@Inject(FormBuilder) fb: FormBuilder,
                private _ls: LoginService) {

        this.form = fb.group({
            'key': [null, Validators.required]
        });

        this.form.valueChanges
            .subscribe(data => this.onValueChanged(data));

        this.onValueChanged(); // (re)set validation messages now

    }

    ngOnInit() {

        this._ls.login()
            .subscribe(
                (result: ApiServiceResult) => {
                    this.users = result.getBody(Users);
                },
                (error: ApiServiceError) => {
                    this.error = error;
                }
            );
    }

    onValueChanged(data?: any) {
        this.loginError = undefined;

        if (!this.form) {
            return;
        }

        /*
        const form = this.form;

        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);

            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
        */
    }


    onSubmit(value: any, valid: any): void {

        if (sessionStorage.clickcount) {
            sessionStorage.clickcount = Number(sessionStorage.clickcount) + 1;
            if (sessionStorage.clickcount > 5) {
                // access denied --> go to the info page
                // the user has tried to login more than five time
                window.location.reload();
            }
        } else {
            sessionStorage.clickcount = 1;
            sessionStorage.timestamp = new Date();
        }


        const newKey = Md5.hashStr(value.key);

        if (newKey === this.users.kader) {
            sessionStorage.setItem('access', 'true');
            window.location.reload();
        } else {
            // access denied
            this.form.setValue({key: null});

        }

    }

    cancel(ev) {
        ev.preventDefault();
        location.replace('/');
    }

}
