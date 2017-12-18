import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {UploadComponent} from './view/upload/upload.component';
import {ListComponent} from './view/list/list.component';
import {LoginComponent} from './view/login/login.component';
import {AboutComponent} from './view/about/about.component';
import {MediaComponent} from './view/media/media.component';
import {RouterModule, Routes} from '@angular/router';
import {ImageDirective} from './view/other/image.directive';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {APP_BASE_HREF} from '@angular/common';
import {LoginService} from './services/login.service';
import {ApiService} from './services/api.service';
import {HttpModule} from '@angular/http';
import { FormatDatePipe } from './view/other/date.pipe';
import { KeyPipe } from './view/other/key.pipe';
import { ErrorComponent } from './view/error/error.component';

import {AppMaterialModule} from './app.material-module';
import { HeaderComponent } from './view/header/header.component';
import { FooterComponent } from './view/footer/footer.component';

const appRoutes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: 'admin',
        component: ListComponent
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'upload',
        component: UploadComponent
    },
    {
        path: 'image/:id',
        component: MediaComponent
    },
    {
        path: '**',
        component: ErrorComponent,
        data: {status: 404}
    }
];

@NgModule({
    declarations: [
        AppComponent,
        UploadComponent,
        ListComponent,
        LoginComponent,
        AboutComponent,
        MediaComponent,
        ImageDirective,
        FormatDatePipe,
        KeyPipe,
        ErrorComponent,
        HeaderComponent,
        FooterComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        FormsModule,
        ReactiveFormsModule,
        AppMaterialModule
    ],
    providers: [
        ApiService,
        LoginService,
        {provide: APP_BASE_HREF, useValue: '/'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
