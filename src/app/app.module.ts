import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AppRoutes} from './app.routing';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {UserService} from '../services/UserService';
import {HttpClient} from '../core/HttpClient';
import {OAuthModule} from 'angular-oauth2-oidc';
import {NewsService} from '../services/NewsService';
import {Repository} from '../core/Repository';
import {TopicsService} from '../services/TopicsService';
import {DevelopersService} from '../services/DevelopersService';
import {GamesService} from '../services/GamesService';
import {ArticlesService} from '../services/ArticlesService';
import 'moment/locale/ru';
import {AppState} from '../core/AppState';
import {SettingsService} from '../services/SettingsService';

@NgModule({
    declarations: [
        AppComponent,
        AdminLayoutComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        RouterModule.forRoot(AppRoutes),
        OAuthModule.forRoot(),
        HttpModule,
        SidebarModule,
        NavbarModule,
        FooterModule
    ],
    providers: [
        HttpClient,
        UserService,
        NewsService,
        ArticlesService,
        GamesService,
        DevelopersService,
        TopicsService,
        Repository,
        SettingsService,
        AppState
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
