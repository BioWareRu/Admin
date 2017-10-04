import {ArticleCategory} from '../models/ArticleCategory';
import {ListResult} from '../core/lists/ListResult';
import {JsonProperty} from 'json-object-mapper';

export class ArticleCategoriesListResult extends ListResult<ArticleCategory> {

  @JsonProperty({type: ArticleCategory, name: 'data'})
  public data: ArticleCategory[];

  constructor() {
    super();
    this.data = undefined;
  }
}
