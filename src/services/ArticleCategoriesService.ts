import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BaseService} from '../core/BaseService';
import {RestClient} from '../core/HttpClient';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;
import {ArticleCategory} from '../models/ArticleCategory';
import {ArticleCategoriesListResult, SaveArticleCategoryResponse} from '../results/ArticleCategories';

@Injectable()
export class ArticlesCategoriesService extends BaseService<ArticleCategory> {
  constructor(httpClient: RestClient) {
    super(httpClient);
  }

  public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<ArticleCategoriesListResult> {
    return this.getAll('articlesCats', page, perPage, sort).map((res: Response) => deserialize(ArticleCategoriesListResult, res));
  }

  public get(id: number): Observable<ArticleCategory> {
    return this.getOne('articlesCats', id).map((res: Response) => deserialize(ArticleCategory, res));
  }

  add(item: any): Observable<any> {
    return this.doAdd('articlesCats', item).map((res: Response) => deserialize(SaveArticleCategoryResponse, res));
  }

  update(id: number, item: any): Observable<any> {
    return this.doUpdate('articlesCats', id, item).map((res: Response) => deserialize(SaveArticleCategoryResponse, res));
  }

  public delete(id: number): Observable<boolean> {
    return this.doDelete('articlesCats', id).map((res: Response) => true);
  }
}
