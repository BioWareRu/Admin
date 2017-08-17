import {Response} from '@angular/http';
import {Observable} from 'rxjs/Rx';
import {HttpClient} from './HttpClient';
import {ListResult} from './ListResult';
// import {deserialize} from 'json-typescript-mapper';

export abstract class BaseService<T> {

  constructor(private httpClient: HttpClient/*,
              private dataObjectClass: { new(): TModel },
              private listDataObjectClass: { new(): ListResult<TModel> }*/) {
  }

  public getAll(resource: string, page: number, perPage: number, sort) {
    // console.log(this.dataObjectClass);
    // console.log(this.listDataObjectClass);
    return this.httpClient.get(resource, {limit: perPage, offset: perPage * (page - 1), order: sort})
      /*.map((res: Response) => /!*deserialize(this.listDataObjectClass, res.json())*!/res.json())*/;
  }

  public getOne(resource: string, id: number) {
    return this.httpClient.get(resource + '/' + id, {})
     /* .map((res: Response) => /!*deserialize(this.dataObjectClass, res.json())*!/res.json())*/;
  }

  public doAdd(resource: string, item: any) {
    return this.httpClient.post(resource, item)
      /*.map((res: Response) => res.json())*/;
  }

  public doUpdate(resource: string, id: number, item: any) {
    return this.httpClient.put(resource + '/' + id, item)
      /*.map((res: Response) => res.json())*/;
  }

  public abstract getList(page: number, perPage: number, sort: string): Observable<ListResult<T>>;

  public abstract get (id: number): Observable<T>;

  public abstract add(item: any): Observable<any>;

  public abstract update(id: number, item: any): Observable<any>;
}
