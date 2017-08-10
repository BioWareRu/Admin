import { ListResult } from '../core/ListResult';
import { JsonProperty } from 'json-typescript-mapper';
import { Topic } from '../models/Topic';
export class TopicListResult extends ListResult<Topic> {

  @JsonProperty({clazz: Topic, name: 'data'})
  public data: Topic[];

  constructor() {
    super();
    this.data = undefined;
  }
}
