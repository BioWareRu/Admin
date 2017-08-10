import { ListResult } from '../core/ListResult';
import { JsonProperty } from 'json-typescript-mapper';
import { Developer } from '../models/Developer';
export class DevelopersListResult extends ListResult<Developer> {

  @JsonProperty({clazz: Developer, name: 'data'})
  public data: Developer[];

  constructor() {
    super();
    this.data = undefined;
  }
}
