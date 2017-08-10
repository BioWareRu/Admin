import { JsonProperty } from 'json-typescript-mapper';
export class ListResult<T> {
  public data: T[];

  @JsonProperty('totalItems')
  public totalItems: number;

  public constructor() {
    this.totalItems = undefined;
  }
}
