import {JsonProperty} from 'json-object-mapper';
import {Model} from './base/Model';

export class User extends Model {
  @JsonProperty()
  public id: number = undefined;
  @JsonProperty()
  public name: string = undefined;
  @JsonProperty()
  public avatarUrl: string = undefined;
}
