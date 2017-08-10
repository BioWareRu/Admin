import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/BaseService';
import { HttpClient } from '../core/HttpClient';
import { ListResult } from '../core/ListResult';
import { Developer } from '../models/Developer';
import { DevelopersListResult } from '../results/DevelopersListResult';
import { deserialize } from 'json-typescript-mapper';

@Injectable()
export class DevelopersService extends BaseService<Developer> {

  constructor(httpClient: HttpClient) {
    super(httpClient/*, Developer, DevelopersListResult*/);
  }

  public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<DevelopersListResult> {
    return this.getAll('developers', page, perPage, sort);
  }

  public get(id: number): Observable<Developer> {
    return this.getOne('developers', id);
  }

  public add(item: Developer): Observable<Developer> {
    throw new Error('Method not implemented.');
  }

  public update(id: number, item: Developer): Observable<Developer> {
    throw new Error('Method not implemented.');
  }
}
