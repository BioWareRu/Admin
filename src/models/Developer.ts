import { Parent, ParentType } from './Parent';
import {JsonProperty} from 'json-object-mapper';

export class Developer extends Parent {

  @JsonProperty()
  public id: number = undefined;
  public type: ParentType;
  @JsonProperty()
  public url: string = undefined;
  @JsonProperty()
  public name: string = undefined;
  @JsonProperty()
  public info: string = undefined;
  @JsonProperty()
  public desc: string = undefined;
  @JsonProperty()
  public logo: string = undefined;
  @JsonProperty()
  public foundYear: number = undefined;
  @JsonProperty()
  public location: string = undefined;
  @JsonProperty()
  public peoples: string = undefined;
  @JsonProperty()
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
