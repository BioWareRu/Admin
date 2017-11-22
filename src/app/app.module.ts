import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {AdminLayoutComponent} from './layouts/admin/admin-layout.component';
import {AppRoutes} from './app.routing';
import {FormsModule} from '@angular/forms';
import {SidebarModule} from './sidebar/sidebar.module';
import {FooterModule} from './shared/footer/footer.module';
import {NavbarModule} from './shared/navbar/navbar.module';
import {UserService} from '../services/UserService';
import {AuthenticationInterceptor, ErrorsInterceptor, LoadingInterceptor, RestClient} from '../core/HttpClient';
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
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthService} from '../services/AuthService';
import {ArticlesCategoriesService} from '../services/ArticleCategoriesService';
import {CoreModule} from '../core/CoreModule';
import {GalleryCategoriesService} from '../services/GalleryCategoriesService';

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
    HttpClientModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    BrowserAnimationsModule,
    CoreModule
  ],
  providers: [
    RestClient,
    AuthService,
    UserService,
    NewsService,
    ArticlesService,
    ArticlesCategoriesService,
    GalleryCategoriesService,
    GamesService,
    DevelopersService,
    TopicsService,
    Repository,
    SettingsService,
    AppState,
    AuthGuard,
    SettingsResolver,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
