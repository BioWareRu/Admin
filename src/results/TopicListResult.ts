import { ListResult } from '../core/lists/ListResult';
import { JsonProperty } from 'json-object-mapper';
import { Topic } from '../models/Topic';
export class TopicListResult extends ListResult<Topic> {

  @JsonProperty({type: Topic, name: 'data'})
  public data: Topic[];

  constructor() {
    super();
    this.data = undefined;
  }
}
