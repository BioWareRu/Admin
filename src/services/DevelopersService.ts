import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BaseService} from '../core/BaseService';
import {HttpClient} from '../core/HttpClient';
import {Developer} from '../models/Developer';
import {DevelopersListResult} from '../results/DevelopersListResult';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;

@Injectable()
export class DevelopersService extends BaseService<Developer> {

  constructor(httpClient: HttpClient) {
    super(httpClient);
  }

  public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<DevelopersListResult> {
    return this.getAll('developers', page, perPage, sort).map((res: Response) => deserialize(DevelopersListResult, res.json()));
  }

  public get (id: number): Observable<Developer> {
    return this.getOne('developers', id).map((res: Response) => deserialize(Developer, res.json()));
  }

  public add(item: Developer): Observable<Developer> {
    throw new Error('Method not implemented.');
  }

  public update(id: number, item: Developer): Observable<Developer> {
    throw new Error('Method not implemented.');
  }

  public delete(id: number): Observable<boolean> {
    throw new Error('Method not implemented.');
  }
}
