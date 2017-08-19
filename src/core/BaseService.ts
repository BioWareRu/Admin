import {Observable} from 'rxjs/Rx';
import {HttpClient} from './HttpClient';
import {ListResult} from './ListResult';

export abstract class BaseService<T> {

  constructor(protected httpClient: HttpClient) {
  }

  protected getAll(resource: string, page: number, perPage: number, sort) {
    return this.httpClient.get(resource, {limit: perPage, offset: perPage * (page - 1), order: sort});
  }

  protected getOne(resource: string, id: number) {
    return this.httpClient.get(resource + '/' + id, {});
  }

  protected doAdd(resource: string, item: any) {
    return this.httpClient.post(resource, item);
  }

  protected doUpdate(resource: string, id: number, item: any) {
    return this.httpClient.put(resource + '/' + id, item);
  }

  protected doDelete(resource: string, id: number) {
    return this.httpClient.delete(resource + '/' + id);
  }

  public abstract getList(page: number, perPage: number, sort: string): Observable<ListResult<T>>;

  public abstract get (id: number): Observable<T>;

  public abstract add(item: any): Observable<any>;

  public abstract update(id: number, item: any): Observable<any>;

  public abstract delete(id: number): Observable<any>;
}
