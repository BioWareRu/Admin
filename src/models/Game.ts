import {Parent, ParentType} from './Parent';
import {JsonProperty} from 'json-object-mapper';

export class Game extends Parent {
  @JsonProperty('id')
  public id: number = undefined;
  public type: ParentType;
  @JsonProperty('developerId')
  public developerId: number = undefined;
  @JsonProperty('url')
  public url: string = undefined;
  @JsonProperty('title')
  public title: string = undefined;
  @JsonProperty('adminTitle')
  public adminTitle: string = undefined;
  @JsonProperty('genre')
  public genre: string = undefined;
  @JsonProperty('releaseDate')
  public releaseDate: string = undefined;
  @JsonProperty('platfroms')
  public platfroms: string = undefined;
  @JsonProperty('desc')
  public desc: string = undefined;
  @JsonProperty('publisher')
  public publisher: string = undefined;
  @JsonProperty('localizator')
  public localizator: string = undefined;
  @JsonProperty('logo')
  public logo: string = undefined;
  @JsonProperty('smallLogo')
  public smallLogo: string = undefined;
  @JsonProperty('tweetTag')
  public tweetTag: string = undefined;
  @JsonProperty('info')
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
