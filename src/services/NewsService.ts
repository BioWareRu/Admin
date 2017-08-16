import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {News} from '../models/News';
import {BaseService} from '../core/BaseService';
import {HttpClient} from '../core/HttpClient';
import {NewsListResult} from '../results/NewsListResult';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;
import {NewsFormModel} from "../app/news/models/NewsFormModel";

@Injectable()
export class NewsService extends BaseService<News> {

  constructor(httpClient: HttpClient) {
    super(httpClient/*, News, NewsListResult*/);
  }

  public getList(page: number = 1, perPage: number = 20, sort: string = '-id'): Observable<NewsListResult> {
    return this.getAll('news', page, perPage, sort).map((res: Response) => deserialize(NewsListResult, res.json()));
  }

  public get (id: number): Observable<News> {
    return this.getOne('news', id).map((res: Response) => deserialize(News, res.json()));
  }

  public add(item: NewsFormModel): Observable<any> {
    return this.doAdd<any>('news', item);
  }

  public update(id: number, item: NewsFormModel): Observable<any> {
    return this.doUpdate<any>('news', id, item);
  }
}
