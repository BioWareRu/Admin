import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { BaseService } from '../core/BaseService';
import { HttpClient } from '../core/HttpClient';
import { Topic } from '../models/Topic';
import { TopicListResult } from '../results/TopicListResult';

@Injectable()
export class TopicsService extends BaseService<Topic> {

  constructor(httpClient: HttpClient) {
    super(httpClient/*, Topic, TopicListResult*/);
  }

  public getList(page: number = 1, perPage: number = 10, sort: string = '-id'): Observable<TopicListResult> {
    return this.getAll('topics', page, perPage, sort);
  }

  public get(id: number): Observable<Topic> {
    return this.getOne('topics', id);
  }

  public add(item: Topic): Observable<Topic> {
    throw new Error('Method not implemented.');
  }

  public update(id: number, item: Topic): Observable<Topic> {
    throw new Error('Method not implemented.');
  }
}
