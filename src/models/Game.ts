import {JsonProperty} from 'json-object-mapper';
import {ParentType} from './base/ParentType';
import {Parent} from './base/Parent';

export class Game extends Parent {
  @JsonProperty()
  public id: number = undefined;
  public type: ParentType;
  @JsonProperty()
  public developerId: number = undefined;
  @JsonProperty()
  public url: string = undefined;
  @JsonProperty()
  public title: string = undefined;
  @JsonProperty()
  public adminTitle: string = undefined;
  @JsonProperty()
  public genre: string = undefined;
  @JsonProperty()
  public releaseDate: string = undefined;
  @JsonProperty()
  public platfroms: string = undefined;
  @JsonProperty()
  public desc: string = undefined;
  @JsonProperty()
  public publisher: string = undefined;
  @JsonProperty()
  public localizator: string = undefined;
  @JsonProperty()
  public logo: string = undefined;
  @JsonProperty()
  public smallLogo: string = undefined;
  @JsonProperty()
  public tweetTag: string = undefined;
  @JsonProperty()
  public info: string = undefined;

  public constructor() {
    super(ParentType.Game);
  }

  public getParentOption() {
    return {
      id: this.id,
      title: this.title,
      type: this.type
    };
  }
}
