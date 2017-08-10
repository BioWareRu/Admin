import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/BaseService';
import { HttpClient } from '../core/HttpClient';
import { ListResult } from '../core/ListResult';
import { Game } from '../models/Game';
import { GamesListResult } from '../results/GamesListResult';

@Injectable()
export class GamesService extends BaseService<Game> {

  constructor(httpClient: HttpClient) {
    super(httpClient/*, Game, GamesListResult*/);
  }

  public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<GamesListResult> {
    return this.getAll('games', page, perPage, sort);
  }

  public get(id: number): Observable<Game> {
    return this.getOne('games', id);
  }

  public add(item: Game): Observable<Game> {
    throw new Error('Method not implemented.');
  }

  public update(id: number, item: Game): Observable<Game> {
    throw new Error('Method not implemented.');
  }
}
