import {ListResult} from '../core/ListResult';
import {JsonProperty} from 'json-object-mapper';
import {Article} from '../models/Article';
import {SaveModelResponse} from '../core/forms/SaveModelResponse';

export class ArticlesListResult extends ListResult<Article> {

  @JsonProperty({type: Article, name: 'data'})
  public data: Article[];

  constructor() {
    super();
    this.data = undefined;
  }
}

export class SaveArticleResponse extends SaveModelResponse<Article> {

}
