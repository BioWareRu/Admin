import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {BaseService} from '../core/BaseService';
import {HttpClient} from '../core/HttpClient';
import {Article} from '../models/Article';
import {ArticlesListResult} from '../results/ArticlesListResult';
import {ObjectMapper} from 'json-object-mapper';
import deserialize = ObjectMapper.deserialize;

@Injectable()
export class ArticlesService extends BaseService<Article> {

    constructor(httpClient: HttpClient) {
        super(httpClient/*, Article, ArticlesListResult*/);
    }

    public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<ArticlesListResult> {
        return this.getAll('articles', page, perPage, sort).map((res: Response) => deserialize(ArticlesListResult, res.json()));
    }

    public get (id: number): Observable<Article> {
        return this.getOne('articles', id).map((res: Response) => deserialize(Article, res.json()));
        ;
    }

    public add(item: Article): Observable<Article> {
        throw new Error('Method not implemented.');
    }

    public update(id: number, item: Article): Observable<Article> {
        throw new Error('Method not implemented.');
    }
}
