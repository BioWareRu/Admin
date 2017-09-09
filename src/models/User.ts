import {JsonProperty} from 'json-object-mapper';

export class User {
  @JsonProperty()
  public id: number = undefined;
  @JsonProperty()
  public name: string = undefined;
  @JsonProperty()
  public avatarUrl: string = undefined;
}
