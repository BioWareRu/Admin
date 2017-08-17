import { Parent, ParentType } from './Parent';
import {JsonProperty} from 'json-object-mapper';
export class Topic extends Parent {
  @JsonProperty()
  public id: number = undefined;
  public type: ParentType;
  @JsonProperty()
  public title: string = undefined;
  @JsonProperty()
  public url: string = undefined;
  @JsonProperty()
  public logo: string = undefined;
  @JsonProperty()
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
