import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from './HttpClient';
import {ListResult} from './ListResult';
// import {deserialize} from 'json-typescript-mapper';

export abstract class BaseService<T> {

  constructor(private httpClient: HttpClient/*,
              private dataObjectClass: { new(): T },
              private listDataObjectClass: { new(): ListResult<T> }*/) {
  }

  public getAll(resource: string, page: number, perPage: number, sort) {
    // console.log(this.dataObjectClass);
    // console.log(this.listDataObjectClass);
    return this.httpClient.get(resource, {limit: perPage, offset: perPage * (page - 1), order: sort})
      .map((res: Response) => /*deserialize(this.listDataObjectClass, res.json())*/res.json());
  }

  public getOne(resource: string, id: number): Observable<T> {
    return this.httpClient.get(resource + '/' + id, {})
      .map((res: Response) => /*deserialize(this.dataObjectClass, res.json())*/res.json());
  }

  public doAdd<TResult>(resource: string, item: T): Observable<TResult> {
    return this.httpClient.post(resource, item)
      .map((res: Response) => res.json());
  }

  public doUpdate<TResult>(resource: string, id: number, item: T): Observable<TResult> {
    return this.httpClient.put(resource + '/' + id, item)
      .map((res: Response) => res.json());
  }

  public abstract getList(page: number, perPage: number, sort: string): Observable<ListResult<T>>;

  public abstract get (id: number): Observable<T>;

  public abstract add<TResult>(item: T): Observable<TResult>;

  public abstract update<TResult>(id: number, item: T): Observable<TResult>;
}
