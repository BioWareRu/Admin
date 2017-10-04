import { ListResult } from '../core/lists/ListResult';
import { JsonProperty } from 'json-object-mapper';
import { Developer } from '../models/Developer';
export class DevelopersListResult extends ListResult<Developer> {

  @JsonProperty({type: Developer, name: 'data'})
  public data: Developer[];

  constructor() {
    super();
    this.data = undefined;
  }
}
