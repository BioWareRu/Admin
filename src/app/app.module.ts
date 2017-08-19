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
import {AuthGuard} from '../core/AuthGuard';
import {SettingsResolver} from '../core/SettingsResolver';
import {BUSY_CONFIG_DEFAULTS, BusyConfig, BusyModule} from 'angular2-busy';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const busyConfig: BusyConfig = {
  message: '',
  backdrop: true,
  template: '<svg class="circular" viewBox="25 25 50 50">\n' +
  '            <circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>\n' +
  '        </svg>',
  delay: 200,
  minDuration: 600,
  wrapperClass: 'loader'
};

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
    FooterModule,
    BrowserAnimationsModule,
    BusyModule.forRoot(busyConfig)
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
    AppState,
    AuthGuard,
    SettingsResolver
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
