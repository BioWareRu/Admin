import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BaseService} from '../core/BaseService';
import {RestClient} from '../core/HttpClient';
import {Game} from '../models/Game';
import {GamesListResult} from '../results/GamesListResult';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;

@Injectable()
export class GamesService extends BaseService<Game> {

  constructor(httpClient: RestClient) {
    super(httpClient/*, Game, GamesListResult*/);
  }

  public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<GamesListResult> {
    return this.getAll('games', page, perPage, sort).map((res: Response) => deserialize(GamesListResult, res));
  }

  public get (id: number): Observable<Game> {
    return this.getOne('games', id).map((res: Response) => deserialize(Game, res));
  }

  public add(item: Game): Observable<Game> {
    throw new Error('Method not implemented.');
  }

  public update(id: number, item: Game): Observable<Game> {
    throw new Error('Method not implemented.');
  }

  public delete(id: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
