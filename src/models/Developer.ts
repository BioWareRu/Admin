import { Parent, ParentType } from './Parent';
import { JsonProperty } from 'json-typescript-mapper';
export class Developer extends Parent {

  @JsonProperty('id')
  public id: number;
  public type: ParentType;
  @JsonProperty('url')
  public url: string;
  @JsonProperty('name')
  public name: string;
  @JsonProperty('info')
  public info: string;
  @JsonProperty('desc')
  public desc: string;
  @JsonProperty('logo')
  public logo: string;
  @JsonProperty('foundYear')
  public foundYear: number;
  @JsonProperty('location')
  public location: string;
  @JsonProperty('peoples')
  public peoples: string;
  @JsonProperty('site')
  public site: string;

  public constructor() {
    super(ParentType.Developer);
    this.id = undefined;
    this.url = undefined;
    this.name = undefined;
    this.info = undefined;
    this.desc = undefined;
    this.logo = undefined;
    this.foundYear = undefined;
    this.location = undefined;
    this.peoples = undefined;
    this.site = undefined;
  }

  public getParentOption() {
    return {
      id: this.id,
      title: this.name,
      type: this.type
    };
  }
}
