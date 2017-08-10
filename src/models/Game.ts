import {Parent, ParentType} from './Parent';
import {JsonProperty} from 'json-typescript-mapper';

export class Game extends Parent {
  @JsonProperty('id')
  public id: number;
  public type: ParentType;
  @JsonProperty('developerId')
  public developerId: number;
  @JsonProperty('url')
  public url: string;
  @JsonProperty('title')
  public title: string;
  @JsonProperty('adminTitle')
  public adminTitle: string;
  @JsonProperty('genre')
  public genre: string;
  @JsonProperty('releaseDate')
  public releaseDate: string;
  @JsonProperty('platfroms')
  public platfroms: string;
  @JsonProperty('desc')
  public desc: string;
  @JsonProperty('publisher')
  public publisher: string;
  @JsonProperty('localizator')
  public localizator: string;
  @JsonProperty('logo')
  public logo: string;
  @JsonProperty('smallLogo')
  public smallLogo: string;
  @JsonProperty('tweetTag')
  public tweetTag: string;
  @JsonProperty('id')
  public info: string;

  public constructor() {
    super(ParentType.Game);
    this.id = undefined;
    this.developerId = undefined;
    this.url = undefined;
    this.title = undefined;
    this.adminTitle = undefined;
    this.genre = undefined;
    this.releaseDate = undefined;
    this.platfroms = undefined;
    this.desc = undefined;
    this.publisher = undefined;
    this.localizator = undefined;
    this.logo = undefined;
    this.smallLogo = undefined;
    this.tweetTag = undefined;
    this.info = undefined;
  }

  public getParentOption() {
    return {
      id: this.id,
      title: this.title,
      type: this.type
    };
  }
}
