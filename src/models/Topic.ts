import { Parent, ParentType } from './Parent';
import { JsonProperty } from 'json-typescript-mapper';
export class Topic extends Parent {
  @JsonProperty('id')
  public id: number;
  public type: ParentType;
  @JsonProperty('title')
  public title: string;
  @JsonProperty('url')
  public url: string;
  @JsonProperty('logo')
  public logo: string;
  @JsonProperty('desc')
  public desc: string;

  public constructor() {
    super(ParentType.Topic);

    this.id = undefined;
    this.title = undefined;
    this.url = undefined;
    this.logo = undefined;
    this.desc = undefined;
  }

  public getParentOption() {
    return {
      id: this.id,
      title: this.title,
      type: this.type
    };
  }
}
