import { ListResult } from '../core/ListResult';
import { News } from '../models/News';
import { JsonProperty } from 'json-typescript-mapper';
export class NewsListResult extends ListResult<News> {

  @JsonProperty({clazz: News, name: 'data'})
  public data: News[];

  constructor() {
    super();
    this.data = undefined;
  }
}
