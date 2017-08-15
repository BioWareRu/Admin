import { Parent, ParentType } from './Parent';
import {JsonProperty} from 'json-object-mapper';

export class Developer extends Parent {

  @JsonProperty('id')
  public id: number = undefined;
  public type: ParentType;
  @JsonProperty('url')
  public url: string = undefined;
  @JsonProperty('name')
  public name: string = undefined;
  @JsonProperty('info')
  public info: string = undefined;
  @JsonProperty('desc')
  public desc: string = undefined;
  @JsonProperty('logo')
  public logo: string = undefined;
  @JsonProperty('foundYear')
  public foundYear: number = undefined;
  @JsonProperty('location')
  public location: string = undefined;
  @JsonProperty('peoples')
  public peoples: string = undefined;
  @JsonProperty('site')
  public site: string = undefined;

  public constructor() {
    super(ParentType.Developer);
  }

  public getParentOption() {
    return {
      id: this.id,
      title: this.name,
      type: this.type
    };
  }
}
