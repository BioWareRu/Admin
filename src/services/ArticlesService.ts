import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BaseService} from '../core/BaseService';
import {RestClient} from '../core/HttpClient';
import {Article} from '../models/Article';
import {ArticlesListResult, SaveArticleResponse} from '../results/Articles';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;
import {ArticlesFormModel} from '../app/articles/models/ArticlesFormModel';

@Injectable()
export class ArticlesService extends BaseService<Article> {

  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<ArticlesListResult> {
    return this.getAll('articles', page, perPage, sort).map((res: Response) => deserialize(ArticlesListResult, res));
  }

  public get(id: number): Observable<Article> {
    return this.getOne('articles', id).map((res: Response) => deserialize(Article, res));
  }

  public add(item: ArticlesFormModel): Observable<SaveArticleResponse> {
    return this.doAdd('articles', item).map((res: Response) => deserialize(SaveArticleResponse, res));
  }

  public update(id: number, item: ArticlesFormModel): Observable<SaveArticleResponse> {
    return this.doUpdate('articles', id, item).map((res: Response) => deserialize(SaveArticleResponse, res));
  }

  public delete(id: number): Observable<boolean> {
    return this.doDelete('articles', id).map((res: Response) => true);
  }

  public publish(id: number): Observable<boolean> {
    return this.httpClient.put('articles/' + id + '/publish', {}).map((res: Response) => true);
  }

  public unpublish(id: number): Observable<boolean> {
    return this.httpClient.put('articles/' + id + '/unpublish', {}).map((res: Response) => false);
  }
}
