import {Response} from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {News} from '../models/News';
import {BaseService} from '../core/BaseService';
import {RestClient} from '../core/HttpClient';
import {ObjectMapper} from 'json-object-mapper';
import {NewsFormModel} from '../app/news/models/NewsFormModel';
import {NewsListResult, SaveNewsResponse} from '../results/News';
import deserialize = ObjectMapper.deserialize;

@Injectable()
export class NewsService extends BaseService<News> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  public getList(page: number = 1, perPage: number = 20, sort: string = '-id'): Observable<NewsListResult> {
    return this.getAll('news', page, perPage, sort).map((res: Response) => deserialize(NewsListResult, res));
  }

  public get (id: number): Observable<News> {
    return this.getOne('news', id).map((res: Response) => deserialize(News, res));
  }

  public add(item: NewsFormModel): Observable<SaveNewsResponse> {
    return this.doAdd('news', item).map((res: Response) => deserialize(SaveNewsResponse, res));
  }

  public update(id: number, item: NewsFormModel): Observable<SaveNewsResponse> {
    return this.doUpdate('news', id, item).map((res: Response) => deserialize(SaveNewsResponse, res));
  }

  public delete(id: number): Observable<boolean> {
    return this.doDelete('news', id).map((res: Response) => true);
  }

  public publish(id: number): Observable<boolean> {
    return this.httpClient.put('news/' + id + '/publish', {}).map((res: Response) => true);
  }

  public unpublish(id: number): Observable<boolean> {
    return this.httpClient.put('news/' + id + '/unpublish', {}).map((res: Response) => false);
  }

  public pin(id: number): Observable<boolean> {
    return this.httpClient.put('news/' + id + '/pin', {}).map((res: Response) => true);
  }

  public unpin(id: number): Observable<boolean> {
    return this.httpClient.put('news/' + id + '/unpin', {}).map((res: Response) => false);
  }
}
