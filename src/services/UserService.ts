import {Injectable} from '@angular/core';
import {User} from '../models/User';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {RestClient} from '../core/HttpClient';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {ReplaySubject} from 'rxjs/ReplaySubject';

@Injectable()
export class UserService {

  public User: Observable<User>;

  private user: Subject<User> = new BehaviorSubject<User>(null);

  private userLoaded = false;

  private loading: ReplaySubject<boolean>;

  private userRights: UserRights[] = [];

  constructor(private _restClient: RestClient) {
    this.User = this.user.asObservable();
  }

  public getUser(): Observable<User> {
    return this.User;
  }

  public loadUser(): Observable<boolean> {
    if (this.loading == null) {
      this.loading = new ReplaySubject<boolean>();
      this._restClient.get('me', []).subscribe(x => {
        const user = deserialize(User, x['user']);
        this.userRights = x['rights'];
        this.user.next(user);
        console.log('user loaded');
        this.loading.next(true);
      });
    }
    return this.loading;
  }

  public hasRight(right: UserRights): boolean {
    return this.userRights.indexOf(right) > -1;
  }

  public isUserLoaded() {
    return this.userLoaded;
  }
}

export enum UserRights {
  Developers,
  AddDevelopers,
  EditDevelopers,
  Games,
  AddGames,
  EditGames,
  News,
  AddNews,
  EditNews,
  PubNews,
  FullNews,
  Articles,
  AddArticles,
  EditArticles,
  PubArticles,
  FullArticles,
  Files,
  AddFiles,
  EditFiles,
  PubFile,
  FullFiles,
  Gallery,
  AddGallery,
  EditGallery,
  PubGallery,
  FullGallery,
  Polls,
  AddPolls,
  EditPolls,
  AlwaysForbidden
}
