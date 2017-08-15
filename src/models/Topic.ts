import { Parent, ParentType } from './Parent';
import {JsonProperty} from 'json-object-mapper';
export class Topic extends Parent {
  @JsonProperty('id')
  public id: number = undefined;
  public type: ParentType;
  @JsonProperty('title')
  public title: string = undefined;
  @JsonProperty('url')
  public url: string = undefined;
  @JsonProperty('logo')
  public logo: string = undefined;
  @JsonProperty('desc')
  public desc: string = undefined;

  public constructor() {
    super(ParentType.Topic);
  }

  public getParentOption() {
    return {
      id: this.id,
      title: this.title,
      type: this.type
    };
  }
}
